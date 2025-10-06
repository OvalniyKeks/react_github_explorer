export default function Stat({
  label,
  value,
  plain = false,
}: {
  label: string;
  value: number | string;
  plain?: boolean;
}) {
  return (
    <div className="btn-outline" style={{ padding: "6px 10px" }}>
      {!plain ? (
        <>
          <strong>{Number(value).toLocaleString()}</strong>{" "}
          <span className="meta"> {label}</span>
        </>
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
}
