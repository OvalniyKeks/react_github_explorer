import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '@services/config'
import type { SearchResponse } from './types';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: (builder) => ({
    searchRepos: builder.query<
      SearchResponse,
      { q: string; sort?: 'stars' | 'updated'; order?: 'desc' | 'asc'; page?: number; per_page?: number }
    >({
      query: ({ q, sort = 'stars', order = 'desc', page = 1, per_page = 20 }) =>
        `/search/repositories?q=${encodeURIComponent(q)}&sort=${sort}&order=${order}&page=${page}&per_page=${per_page}`,
    }),
  }),
})

export const { useSearchReposQuery } = githubApi
