"use client";

import { CodeBlock } from "./elements/code_blok";

type ContentBlock = { type: string; data: any };

const renderBlock = (block: ContentBlock, index: number) => {
  switch (block.type) {
    case "heading":
      const Tag = `h${block.data.level}` as any;
      let className = "font-semibold ";

      if (block.data.level === 2) {
        className +=
          " text-2xl lg:text-3xl mt-12 mb-4 pb-2 border-b border-slate-700";
      } else if (block.data.level === 3) {
        className += " text-xl lg:text-2xl mt-8 mb-4";
      } else {
        className += " text-lg mt-6 mb-3";
      }

      return (
        <Tag key={index} className={className}>
          {block.data.text}
        </Tag>
      );

    case "paragraph":
      return (
        <p key={index} className="my-5 leading-relaxed">
          {block.data.text}
        </p>
      );

    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-sky-500  bg-sky-500/40 dark:text-white font-semibold px-5 py-3 my-6 rounded-r-lg"
        >
          {block.data.text}
        </blockquote>
      );

    case "code":
      return (
        <CodeBlock
          key={index}
          language={block.data.language}
          code={block.data.code}
        />
      );
    default:
      return null;
  }
};

export const ArticleRenderer = ({ content }: { content: ContentBlock[] }) => {
  return <div>{content.map((block, index) => renderBlock(block, index))}</div>;
};
