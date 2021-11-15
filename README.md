# Simple React Query ⭐️

<br/>

## A Light Weight Data Fetching Library
- 📦 Unpacked Size: only `17.7KB` (react-query is `2.18MB`)

<br/>

## Features
- ✅ Simple useQuery
- ✅ Simple useMutation
- ✅ Simple refetchInterval & clearRefetchInterval
- ✅ Setting initialData
- ✅ Caching is not a default (It's optional)

<br/>

## Backgrounds

### 1. react-query is heavy

- 리액트 쿼리는 무겁습니다

### 2. Too many methods, but I need only some

- 리액트 쿼리는 너무 많은 기능을 제공합니다.
- 나는 단지 비동기 상태관리를 하고싶을 뿐인데, 비동기에 대한 모든 도구와 설명을 제공해줍니다.
- 대부분의 기능은 필요없거나, 스스로 충분히 구현가능합니다.

### 3. When bugs occurred, debugging is hell

- 리액트 쿼리의 내부 동작을 알 수 없습니다.
- 어플리케이션이 복잡할수록, 버그가 발생했을때 디버깅하기 복잡합니다.

### 4. Interface of useMutation is different from that of useQuery

- useMutation은 .mutateAsync 호출시 에러를 throw했을때 try/catch로 잡아줘야하는 반면, useQuery는 에러를 throw했을떄 error 객체에 자동으로 반영되어서 사용의 일관성이 없습니다.

### 5. useQuery data type must include "undefined"

- react-query의 useQuery data타입은 항상 undefined 타입을 union으로 추가합니다.
- 예를들어, useQuery의 타입을 string으로 두면 `string | undefined`의 data타입을 가지고 initialData를 `null` 로 설정하면 data 타입이 `string | null | undefined` 가 됩니다.

### 6. Difficult to cancel refreshInterval setting

- react-query의 refreshInterval은 주기적인 요청을 보낼 수 있지만, 해당 주기인 요청을 취소하려면 axios의 cancel 기능을 사용해야 하는 등의 복잡한 구현이 필요합니다.

### 7. react-query caching is a default

- 캐싱을 기본적으로 해서, 가끔씩 예상치 못한 동작을 수행합니다.

<br/>

## Usage

### Install

```
yarn add simple-react-query
```

### QueryClient

QueryClient has queryCache.

```tsx
import { QueryClient, QueryClientProvider } from "simple-react-query";

<QueryClientProvider value={QueryClient}>
  <App />
</QueryClientProvider>;
```

### useQuery

```tsx
const {
  refetch,
  isLoading,
  isError,
  data,
  error,
  setData,
  isSuccess,
  clearRefetchInterval,
  isFetched
} = useQuery<TypeOfResponseData>({
  enabled: true,
  query: () => fetch(...),
  initialData: {},
  onSuccess: () => console.log("fetch success!"),
  refetchInterval: 5000,
  isEqualToPrevDataFunc: (a,b) => a.id === b.id,
  cacheTime: 5000,
  queryKeys: ["User", "id"]
});
```

#### Props

1. `enabled`: auto fetch, when useQuery called
2. `query`: fetch function
3. `onSuccess (optional)`: action after query fetched successfully
4. `initialData (optional)`: set initial data
5. `refetchInterval (optional)`: refetch interval (ms)(background ok)
6. `isEqualToPrevDataFunc (optional)`: when newData fetched, isEqualToPrevDataFunc called with (newData, prevData), if false update newData, true don't update newData because it is same.
7. `cacheTime (optional)`: caching time useQuery's return data. (ms) default is 0.
8. `queryKeys (optional)`: caching is decided by queryKeys. It must be array.

#### Returns

1. `refetch`: refetch query
2. `isLoading`: fetch is not complete
3. `isError`: fetch has error
4. `data`: fetch's return data (or cached data)
5. `error`: error object
6. `setData`: update data state
7. `isSuccess`: fetch is complete successfully
8. `clearRefetchInterval`: clear interval refetch
9. `isFetched`: query is fetched more then 1 time

### useMutation

```tsx
const { isLoading, isError, error, data, mutation } = useMutation<
  TypeRequestData,
  TypeResponseData
>({
  query: (_data: TypeRequestData) => fetch(_data),
  onSuccess: () => {
    console.log("mutation successfully");
  }
});
```

#### Props

1. `query`: mutation fetch function
2. `onSuccess (optional)`: action after query fetched successfully

#### Returns

1. `isLoading`: fetch is not complete
2. `isError`: fetch has error
3. `data`: fetch's return data
4. `error`: error object
5. `mutation`: wrapped async fetch function, use this function instead fetch

<br/>

## Has Better Idea?

- When you want another method, contact definedable@gmail.com or custom yourself this code. It is very simple!
