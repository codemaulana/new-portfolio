// File: app/projects/[slug]/_components/MarkdownBlock.tsx
"use client";

import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

interface MarkdownBlockProps {
  code: string;
}

export const MarkdownBlock = ({ code }: MarkdownBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset ikon setelah 2 detik
    });
  };

  return (
    <div className="bg-[#1e1e1e] rounded-lg my-4 relative group">
      <pre className="p-4 text-sm sm:text-base text-gray-200 overflow-x-auto">
        <code className="font-mono whitespace-pre-wrap">{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-md bg-gray-700/50 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 hover:bg-gray-600/70"
        aria-label="Copy code to clipboard"
      >
        {isCopied ? (
          <FiCheck className="w-5 h-5 text-green-400" />
        ) : (
          <FiCopy className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};
