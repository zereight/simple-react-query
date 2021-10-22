import { useEffect, useRef, useState } from "react";

interface Props {
  enabled: boolean;
  query: (props?: any) => Promise<any>;
  onSuccess?: () => void;
  initialData?: any;
  refetchInterval?: number;
  isEqualToPrevDataFunc?: (prev: any, curr: any) => boolean;
}

export const useQuery = <T>({
  enabled,
  query,
  onSuccess,
  initialData,
  refetchInterval,
  isEqualToPrevDataFunc
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T>(initialData);
  const timeIdRef = useRef<NodeJS.Timer | null>(null);

  const refetch = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const newData = await query();

      if (isEqualToPrevDataFunc) {
        if (!isEqualToPrevDataFunc(data, newData)) {
          setData(newData);
        }
      } else {
        setData(newData);
      }

      await onSuccess?.();
      setIsFetched(true);
    } catch (error) {
      if (!(error instanceof Error)) return;

      setIsError(true);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearRefetchInterval = () => {
    if (timeIdRef.current) clearInterval(timeIdRef.current);
  };

  useEffect(() => {
    if (enabled) refetch();
  }, []);

  useEffect(() => {
    if (timeIdRef.current) clearInterval(timeIdRef.current);
    if (refetchInterval === undefined) return;

    timeIdRef.current = setInterval(() => {
      refetch();
    }, refetchInterval);

    return () => {
      if (timeIdRef.current) clearInterval(timeIdRef.current);
    };
  }, []);

  return {
    refetch,
    isLoading,
    isError,
    data,
    error,
    setData,
    isSuccess: !isError,
    clearRefetchInterval,
    isFetched
  };
};
