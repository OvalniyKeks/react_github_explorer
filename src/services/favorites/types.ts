export type FavRepo = {
  id: number
  full_name: string
  html_url: string
  stargazers_count: number
  owner: { login: string; avatar_url: string} 
}
export type Snapshot = Readonly<{
  list: ReadonlyArray<FavRepo>
  ids: ReadonlySet<number>
}>

