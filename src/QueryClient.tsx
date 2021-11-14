import { createContext, useContext } from "react";

interface QueryClientInterface {
  queryCaches: {
    [key: string]: any;
  };
}

export const QueryClient: QueryClientInterface = {
  queryCaches: {}
};

const QueryClientContext = createContext(QueryClient);

export const QueryClientProvider = QueryClientContext.Provider;

export const useQueryClient = () => {
  return useContext(QueryClientContext);
};
