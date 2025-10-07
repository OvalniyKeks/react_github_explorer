import type { Repo } from '@/features/api/types'
import { useNavigate } from 'react-router-dom'
import { useFavorites, setFavorite } from '@/services/favorites'

export default function RepoCard({ repo }: { repo: Repo }) {
  const nav = useNavigate()
  const go = () => nav(`/repo/${repo.owner.login}/${repo.name}`)

  const { isFavorite, toggle } = useFavorites()
  const fav = isFavorite(repo.id)

  const onToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggle(setFavorite(repo))
  }

  return (
    <div
      className="card"
      role="link"
      tabIndex={0}
      onClick={go}
      onKeyDown={(e) => e.key === 'Enter' && go()}
    >
      <div className="card-header">
        <img src={repo.owner.avatar_url} alt={repo.owner.login} />
        <div>
          <a
            className="title"
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {repo.full_name}
          </a>
          <div className="meta">⭐ {repo.stargazers_count.toLocaleString()}</div>
        </div>

        <button
          className={`fav ${fav ? 'active' : ''}`}
          onClick={onToggle}
          aria-pressed={fav}
          title={fav ? 'Убрать из избранного' : 'В избранное'}
        >
          {fav ? '★' : '☆'}
        </button>
      </div>

      {repo.description && <p className="desc">{repo.description}</p>}
    </div>
  )
}
