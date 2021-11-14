import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "./QueryClient";

interface Props<ResponseData> {
  enabled: boolean;
  query: (props?: ResponseData) => Promise<ResponseData>;
  onSuccess?: () => void;
  initialData?: ResponseData;
  refetchInterval?: number;
  isEqualToPrevDataFunc?: (
    prev: ResponseData | undefined,
    curr: ResponseData
  ) => boolean;
  cacheTime?: number;
  queryKeys?: string[];
}

export const useQuery = <T>({
  enabled,
  query,
  onSuccess,
  initialData,
  refetchInterval,
  isEqualToPrevDataFunc,
  cacheTime = 0,
  queryKeys
}: Props<T>) => {
  const queryClientContext = useQueryClient();
  const queryKeyString = queryKeys ? JSON.stringify(queryKeys) : "";
  const hasCache =
    queryKeyString && !!queryClientContext.queryCaches[queryKeyString];

  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const [data, setData] = useState<T | undefined>(initialData);
  const intervalTimeIdRef = useRef<NodeJS.Timer | null>(null);
  const cacheTimeIdRef = useRef<NodeJS.Timer | null>(null);

  const clearRefetchTimeInterval = () => {
    if (intervalTimeIdRef.current) clearInterval(intervalTimeIdRef.current);
  };

  const clearCacheTimeout = () => {
    if (cacheTimeIdRef.current) clearTimeout(cacheTimeIdRef.current);
  };

  const doRefetchTimeInterval = () => {
    clearRefetchTimeInterval();
    if (refetchInterval === undefined) return;

    intervalTimeIdRef.current = setInterval(() => {
      refetch();
    }, refetchInterval);
  };

  const doCacheTimeout = (data: T) => {
    clearCacheTimeout();
    queryClientContext.queryCaches[queryKeyString] = data;
    cacheTimeIdRef.current = setTimeout(() => {
      delete queryClientContext.queryCaches[queryKeyString];
    }, cacheTime);
  };

  const refetch = async () => {
    try {
      setIsLoading(true);

      const newData = await query();

      if (isEqualToPrevDataFunc) {
        if (!isEqualToPrevDataFunc(data, newData)) {
          setData(newData);
        }
      } else {
        setData(newData);
      }

      await onSuccess?.();

      doCacheTimeout(newData);
    } catch (error) {
      if (!(error instanceof Error)) return;

      setError(error);
    } finally {
      setIsFetched(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (hasCache) return;
    if (enabled) refetch();
  }, []);

  useEffect(() => {
    doRefetchTimeInterval();

    return () => {
      clearRefetchTimeInterval();
      clearCacheTimeout();
    };
  }, []);

  return {
    refetch,
    isLoading,
    isError: !!error && isFetched,
    isSuccess: !error && isFetched,
    data: hasCache
      ? (queryClientContext.queryCaches[queryKeyString] as T | undefined)
      : data,
    error,
    setData,
    clearRefetchTimeInterval,
    isFetched
  };
};
