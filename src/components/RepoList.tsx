import { useEffect, useState } from "react";
import { useSearchReposQuery, type Repo } from "../features/githubApi";
import RepoCard from "./RepoCard";

type Props = {
  query: string;
  sort: "stars" | "updated";
  order: "desc" | "asc";
};

export default function RepoList({ query, sort, order }: Props) {
  const [page, setPage] = useState(1);
  const per_page = 20;

  const enabled = query.trim().length > 0;

  const { data, isFetching, isError } = useSearchReposQuery(
    { q: query, sort, order, page, per_page },
    { skip: !enabled }
  );

  const [items, setItems] = useState<Repo[]>([]);

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [query, sort, order]);

  useEffect(() => {
    if (!data?.items) return;
    setItems((prev) => {
      return [...prev, ...data.items];
    });
  }, [data, page]);

  const empty = !isFetching && items.length === 0 && enabled;

  return (
    <div className="list">
      {items.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}

      {isFetching && <div className="loader">Загрузка…</div>}
      {isError && (
        <div className="error">
          Ошибка загрузки. Попробуйте изменить запрос.
        </div>
      )}
      {empty && <div className="empty">Ничего не найдено</div>}
    </div>
  );
}
