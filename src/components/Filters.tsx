import { useId } from "react";

type Props = {
  sort: "stars" | "updated";
  order: "desc" | "asc";
  onChange: (s: { sort: "stars" | "updated"; order: "desc" | "asc" }) => void;
};

export default function Filters({ sort, order, onChange }: Props) {
  const sortId = useId();
  const orderId = useId();
  return (
    <div className="filters">
      <label htmlFor={sortId}>Сортировка</label>
      <select
        id={sortId}
        value={sort}
        onChange={(e) => onChange({ sort: e.target.value as any, order })}
      >
        <option value="stars">По звездам</option>
        <option value="updated">По обновлению</option>
      </select>
      <label htmlFor={orderId}>Порядок</label>
      <select
        id={orderId}
        value={order}
        onChange={(e) => onChange({ sort, order: e.target.value as any })}
      >
        <option value="desc">Убыв.</option>
        <option value="asc">Возр.</option>
      </select>
    </div>
  );
}
