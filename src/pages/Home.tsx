import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import RepoList from "../components/RepoList";

export default function Home() {
  const [query, setQuery] = useState("TypeScript");
  const [sort, setSort] = useState<"stars" | "updated">("stars");
  const [order, setOrder] = useState<"desc" | "asc">("desc");

  return (
    <>
      <SearchBar onSubmit={setQuery} initial={query} />
      <Filters
        sort={sort}
        order={order}
        onChange={({ sort, order }) => {
          setSort(sort);
          setOrder(order);
        }}
      />

      <section>
        <h2>Результаты поиска</h2>
        <RepoList query={query} sort={sort} order={order} />
      </section>
    </>
  );
}
