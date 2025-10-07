import { useFavorites } from '@services/favorites'

export default function FavoritesPanel() {
  const { list, clear, remove } = useFavorites()
  return (
    <div className="favorites" style={{ marginTop: 16 }}>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="meta">Избранное: {list.length}</div>
        <button className="btn-outline" onClick={clear} disabled={!list.length}>Очистить</button>
      </div>

      {list.map((f) => (
        <div key={f.id} className="fav-item">
          <a className="title" href={f.html_url} target="_blank" rel="noreferrer">{f.full_name}</a>
          <div className="row" style={{ gap: 8 }}>
            <span className="meta">⭐ {f.stargazers_count.toLocaleString()}</span>
            <button className="btn-outline" onClick={() => remove(f.id)}>Убрать</button>
          </div>
        </div>
      ))}
      {!list.length && <div className="empty">Пусто</div>}
    </div>
  )
}
