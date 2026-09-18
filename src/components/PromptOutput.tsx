"use client";

import { useState } from "react";
import { CopyIcon } from "@/components/icons";

type PromptOutputProps = { prompt: string };

export function PromptOutput({ prompt }: PromptOutputProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 1800);
    } catch {
      setCopyStatus("error");
    }
  };

  return (
    <section className="prompt-section" aria-labelledby="prompt-heading">
      <div className="prompt-section__heading">
        <div>
          <p className="eyebrow">IMAGE GENERATION READY</p>
          <h2 id="prompt-heading">プロンプト</h2>
        </div>
        <button className="copy-button" type="button" onClick={handleCopy}>
          <CopyIcon />
          {copyStatus === "copied" ? "コピーしました" : "コピー"}
        </button>
      </div>
      {copyStatus === "error" && <p className="copy-error" role="alert">コピーできませんでした。ブラウザの権限を確認してください。</p>}
      <pre className="prompt-output">{prompt}</pre>
    </section>
  );
}
