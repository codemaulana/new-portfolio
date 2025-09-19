"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Check, Copy } from "lucide-react";

export const CodeBlock = ({
  language,
  code,
}: {
  language: string;
  code: string;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="relative my-6 group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 cursor-pointer bg-slate-700 rounded-md text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-sky-500"
        aria-label="Copy code"
      >
        {isCopied ? (
          <Check size={16} className="text-green-400" />
        ) : (
          <Copy size={16} />
        )}
      </button>
      <SyntaxHighlighter
        language={language}
        style={nightOwl}
        customStyle={{
          borderRadius: "8px",
          padding: "1.5rem",
          fontSize: "0.9rem",
        }}
        codeTagProps={{
          style: {
            fontFamily: '"Fira Code", monospace',
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
