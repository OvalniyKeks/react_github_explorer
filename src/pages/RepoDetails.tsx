import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Repo } from "../features/githubApi";

import CopyCloneButton from "../components/CopyCloneButton";
import Stat from "../components/Stat";

import getBaseUrl from '../services/config'

type Contributor = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
};

export default function RepoDetails() {
  const { owner, name } = useParams<{ owner: string; name: string }>();
  const [repo, setRepo] = useState<Repo | null>(null);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingContrib, setLoadingContrib] = useState(false);

  const repoUrl = useMemo(() => {
    if (!owner || !name) return null;
    return `${getBaseUrl()}/repos/${encodeURIComponent(
      owner
    )}/${encodeURIComponent(name)}`;
  }, [owner, name]);

  useEffect(() => {
    if (!repoUrl) {
      setError("Неверный маршрут: owner/name не заданы");
      return;
    }
    let aborted = false;
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);
    setRepo(null);

    (async () => {
      try {
        const repo = await fetch(repoUrl, {
          headers: {
            Accept: "application/vnd.github+json",
          },
          signal: ctrl.signal,
        });
        if (!repo.ok) throw new Error(`${repo.status} ${repo.statusText}`);
        const json = (await repo.json()) as Repo;
        if (!aborted) setRepo(json);
      } catch (e: any) {
        if (!aborted) setError(e?.message ?? "Ошибка загрузки");
      } finally {
        if (!aborted) setLoading(false);
      }
    })();

    return () => {
      aborted = true;
      ctrl.abort();
    };
  }, [repoUrl]);

  useEffect(() => {
    if (!repoUrl) return;
    let aborted = false;
    const ctrl = new AbortController();

    setLoadingContrib(true);

    (async () => {
      try {
        const url = `${repoUrl}/contributors?per_page=10`;
        const r = await fetch(url, { signal: ctrl.signal });
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        const json = (await r.json()) as Contributor[];
        if (!aborted) setContributors(json);
      } catch {
        if (!aborted) setContributors([]);
      } finally {
        if (!aborted) setLoadingContrib(false);
      }
    })();
    return () => {
      aborted = true;
      ctrl.abort();
    };
  }, [repoUrl]);

  const formatDate = (d: string) =>
    new Intl.DateTimeFormat("ru", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(d));

  if (loading) {
    return <div className="loader">Загрузка…</div>;
  }
  if (error) {
    return (
      <div className="error">
        {error}
        <div style={{ marginTop: 12 }}>
          <Link className="btn-outline" to="/">
            Назад
          </Link>
        </div>
      </div>
    );
  }
  if (!repo) return null;

  return (
    <div className="container">
      <div
        className="row"
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <h2 style={{ margin: 0 }}>{repo.full_name}</h2>
        <div className="row">
          <Link className="btn-outline" to="/">
            ← К списку
          </Link>
          <a
            className="btn"
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
          >
            Открыть на GitHub
          </a>
        </div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <div className="card-header">
          <img src={repo.owner.avatar_url} alt={repo.owner.login} />
          <div>
            <div className="meta">
              Автор:{" "}
              <a
                className="title"
                href={repo.owner.html_url}
                target="_blank"
                rel="noreferrer"
              >
                {repo.owner.login}
              </a>
            </div>
            <div className="meta">
              Создан: {formatDate(repo.created_at)} • Обновлён:{" "}
              {formatDate(repo.updated_at)}
            </div>
          </div>
          <div className="flex-center-v flex-end-h w-100">
            <code className="copy-url" style={{ marginRight: "12px" }}>
              {repo.html_url}.git
            </code>
            <CopyCloneButton url={repo.html_url} />
          </div>
        </div>

        {repo.description && <div className="desc">{repo.description}</div>}

        <div
          className="row"
          style={{ gap: 12, marginTop: 12, flexWrap: "wrap" }}
        >
          <Stat label="Stars" value={repo.stargazers_count} />
          <Stat label="Watchers" value={repo.subscribers_count} />
          <Stat label="Forks" value={repo.forks_count} />
          <Stat label="Issues" value={repo.open_issues_count} />
          {repo.language && (
            <Stat label="Language" value={repo.language} plain />
          )}
          {repo.license?.name && (
            <Stat label="License" value={repo.license.name} plain />
          )}
        </div>

        {!!repo.topics?.length && (
          <div style={{ marginTop: 12 }}>
            <div className="meta" style={{ marginBottom: 6 }}>
              Topics:
            </div>
            <div className="row" style={{ gap: 6 }}>
              {repo.topics!.map((t) => (
                <span
                  key={t}
                  className="btn-outline"
                  style={{ padding: "4px 8px" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {repo.homepage && (
          <div style={{ marginTop: 12 }}>
            <a
              className="title"
              href={repo.homepage}
              target="_blank"
              rel="noreferrer"
            >
              {repo.homepage}
            </a>
          </div>
        )}
      </div>

      <section style={{ marginTop: 16 }}>
        <h3 style={{ margin: "0 0 8px" }}>Top contributors</h3>
        {loadingContrib && (
          <div className="loader">Загрузка контрибьюторов…</div>
        )}
        {!loadingContrib && (
          <div className="list">
            {contributors.map((c) => (
              <div key={c.id} className="card">
                <div className="card-header">
                  <img src={c.avatar_url} alt={c.login} />
                  <div>
                    <a
                      className="title"
                      href={c.html_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {c.login}
                    </a>
                    <div className="meta">commits: {c.contributions}</div>
                  </div>
                </div>
              </div>
            ))}
            {contributors.length === 0 && (
              <div className="empty">Нет данных</div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}


