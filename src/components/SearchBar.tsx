import { useState } from "react";

type PropsSearchBar = { onSubmit: (q: string) => void; initial?: string };
export default function SearchBar({ onSubmit, initial = "react" }: PropsSearchBar) {
  const [q, setQ] = useState(initial);
  return (
    <form
      className="row"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(q);
      }}
    >
      <input
        className="input"
        placeholder="Поиск репозиториев"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button className="btn">Искать</button>
    </form>
  );
}
