export type FavRepo = {
  id: number
  full_name: string
  html_url: string
  stargazers_count: number
  owner: { login: string; avatar_url: string }
}

const STORAGE_KEY = 'favorite_repos'

function safeParse<T>(raw: string | null, fallback: T): T {
  try { return raw ? (JSON.parse(raw) as T) : fallback } catch { return fallback }
}

type Snapshot = Readonly<{
  list: ReadonlyArray<FavRepo>
  ids: ReadonlySet<number>
}>

class FavoritesStore {
  private map: Map<number, FavRepo>
  private listeners = new Set<() => void>()

  private snapshot: Snapshot

  constructor() {
    const initial = safeParse<FavRepo[]>(localStorage.getItem(STORAGE_KEY), [])
    this.map = new Map(initial.map(r => [r.id, r]))
    this.snapshot = this.buildSnapshot()
  }

  private buildSnapshot(): Snapshot {
    const list = Object.freeze(Array.from(this.map.values()))
    const ids  = Object.freeze(new Set(this.map.keys())) as ReadonlySet<number>
    return Object.freeze({ list, ids })
  }

  private persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(this.map.values())))
  }

  private notify() {
    for (const l of this.listeners) l()
  }

  getSnapshot(): Snapshot {
    return this.snapshot
  }

  subscribe = (fn: () => void) => {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  isFavorite(id: number) { return this.map.has(id) }

  add(item: FavRepo) {
    if (this.map.has(item.id)) return
    this.map.set(item.id, item)
    this.snapshot = this.buildSnapshot()
    this.persist()
    this.notify()
  }

  remove(id: number) {
    if (!this.map.delete(id)) return
    this.snapshot = this.buildSnapshot()
    this.persist()
    this.notify()
  }

  toggle(item: FavRepo) {
    if (this.map.has(item.id)) this.map.delete(item.id)
    else this.map.set(item.id, item)
    this.snapshot = this.buildSnapshot()
    this.persist()
    this.notify()
  }

  clear() {
    if (this.map.size === 0) return
    this.map.clear()
    this.snapshot = this.buildSnapshot()
    this.persist()
    this.notify()
  }
}

export const favoritesStore = new FavoritesStore()

import * as React from 'react'
export function useFavorites() {
  const snap = React.useSyncExternalStore(
    favoritesStore.subscribe,
    () => favoritesStore.getSnapshot(),
    () => favoritesStore.getSnapshot()
  )
  return {
    list: snap.list,
    isFavorite: (id: number) => snap.ids.has(id),
    toggle: (item: FavRepo) => favoritesStore.toggle(item),
    remove: (id: number) => favoritesStore.remove(id),
    clear: () => favoritesStore.clear(),
  }
}

export function setFavorite(repo: {
  id: number
  full_name: string
  html_url: string
  stargazers_count: number
  owner: { login: string; avatar_url: string }
}): FavRepo {
  return {
    id: repo.id,
    full_name: repo.full_name,
    html_url: repo.html_url,
    stargazers_count: repo.stargazers_count,
    owner: repo.owner,
  }
}
