import { useState } from "react";

export default function CopyCloneButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  const copyClone = async () => {
    try {
      await navigator.clipboard.writeText(`git clone ${url}.git`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <button
      className="btn-outline copy-btn"
      onClick={copyClone}
    >
      <svg
        className="icon"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        aria-hidden="true"
      >
        <path
          d="M9 3h6a2 2 0 0 1 2 2v1h1a2 2 0 0 1 2 2v10a2 
             2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1V5a2 2 0 0 1 2-2zm0 4H8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-1v1a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V7zm2-2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H11z"
          fill="currentColor"
        />
      </svg>
      <span className="copy-label">
        {copied ? "Скопировано!" : "Копировать"}
      </span>
    </button>
  );
}
