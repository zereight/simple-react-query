# Simple React Query โญ๏ธ

<br/>

## A Light Weight Data Fetching Library
- ๐ฆ Unpacked Size: only `17.7KB` (react-query is `2.18MB`)

<br/>

## Features
- โ Simple useQuery
- โ Simple useMutation
- โ Simple refetchInterval & clearRefetchInterval
- โ Setting initialData
- โ Caching is not a default (It's optional)

<br/>

## Backgrounds

### 1. react-query is heavy

- ๋ฆฌ์กํธ ์ฟผ๋ฆฌ๋ ๋ฌด๊ฒ์ต๋๋ค

### 2. Too many methods, but I need only some

- ๋ฆฌ์กํธ ์ฟผ๋ฆฌ๋ ๋๋ฌด ๋ง์ ๊ธฐ๋ฅ์ ์ ๊ณตํฉ๋๋ค.
- ๋๋ ๋จ์ง ๋น๋๊ธฐ ์ํ๊ด๋ฆฌ๋ฅผ ํ๊ณ ์ถ์ ๋ฟ์ธ๋ฐ, ๋น๋๊ธฐ์ ๋ํ ๋ชจ๋  ๋๊ตฌ์ ์ค๋ช์ ์ ๊ณตํด์ค๋๋ค.
- ๋๋ถ๋ถ์ ๊ธฐ๋ฅ์ ํ์์๊ฑฐ๋, ์ค์ค๋ก ์ถฉ๋ถํ ๊ตฌํ๊ฐ๋ฅํฉ๋๋ค.

### 3. When bugs occurred, debugging is hell

- ๋ฆฌ์กํธ ์ฟผ๋ฆฌ์ ๋ด๋ถ ๋์์ ์ ์ ์์ต๋๋ค.
- ์ดํ๋ฆฌ์ผ์ด์์ด ๋ณต์กํ ์๋ก, ๋ฒ๊ทธ๊ฐ ๋ฐ์ํ์๋ ๋๋ฒ๊นํ๊ธฐ ๋ณต์กํฉ๋๋ค.

### 4. Interface of useMutation is different from that of useQuery

- useMutation์ .mutateAsync ํธ์ถ์ ์๋ฌ๋ฅผ throwํ์๋ try/catch๋ก ์ก์์ค์ผํ๋ ๋ฐ๋ฉด, useQuery๋ ์๋ฌ๋ฅผ throwํ์๋ error ๊ฐ์ฒด์ ์๋์ผ๋ก ๋ฐ์๋์ด์ ์ฌ์ฉ์ ์ผ๊ด์ฑ์ด ์์ต๋๋ค.

### 5. useQuery data type must include "undefined"

- react-query์ useQuery dataํ์์ ํญ์ undefined ํ์์ union์ผ๋ก ์ถ๊ฐํฉ๋๋ค.
- ์๋ฅผ๋ค์ด, useQuery์ ํ์์ string์ผ๋ก ๋๋ฉด `string | undefined`์ dataํ์์ ๊ฐ์ง๊ณ  initialData๋ฅผ `null` ๋ก ์ค์ ํ๋ฉด data ํ์์ด `string | null | undefined` ๊ฐ ๋ฉ๋๋ค.

### 6. Difficult to cancel refreshInterval setting

- react-query์ refreshInterval์ ์ฃผ๊ธฐ์ ์ธ ์์ฒญ์ ๋ณด๋ผ ์ ์์ง๋ง, ํด๋น ์ฃผ๊ธฐ์ธ ์์ฒญ์ ์ทจ์ํ๋ ค๋ฉด axios์ cancel ๊ธฐ๋ฅ์ ์ฌ์ฉํด์ผ ํ๋ ๋ฑ์ ๋ณต์กํ ๊ตฌํ์ด ํ์ํฉ๋๋ค.

### 7. react-query caching is a default

- ์บ์ฑ์ ๊ธฐ๋ณธ์ ์ผ๋ก ํด์, ๊ฐ๋์ฉ ์์์น ๋ชปํ ๋์์ ์ํํฉ๋๋ค.

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
