import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../services/config'

export type Owner = { login: string; avatar_url: string; html_url: string }

export type Repo = {
  id: number
  name: string
  full_name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  open_issues_count: number
  subscribers_count: number
  language: string | null
  license: { key: string; name: string } | null
  topics?: string[]
  html_url: string
  homepage?: string | null
  owner: Owner
  updated_at: string
  created_at: string
}

export type SearchResponse = {
  total_count: number
  incomplete_results: boolean
  items: Repo[]
}

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
