import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useFavorites } from "@services/favorites";

export default function App() {
  const { list } = useFavorites();
  const count = list.length;

  const nav = useNavigate();
  const loc = useLocation();
  const onClick = () => {
    nav(loc.pathname === "/favorites" ? "/" : "/favorites");
  };

  return (
    <div className="container">
      <header className="header header--bar">
        <div className="header-left">
          <h1>GitHub Explorer</h1>
          <p>Поиск репозиториев GitHub</p>
        </div>

        <div className="header-actions">
          <button className="btn-outline fav-btn" onClick={onClick} aria-label="Избранное">
            <svg className="icon-star" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M12 3l2.9 5.88 6.49.94-4.7 4.58 1.11 6.49L12 17.77l-5.8 3.05 1.11-6.49-4.7-4.58 6.49-.94L12 3z" fill="currentColor"/>
            </svg>
            <span>Избранное</span>
            <span className="badge">{count}</span>
          </button>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
