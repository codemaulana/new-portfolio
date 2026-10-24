"use client";

import React, { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Image as ImageIcon,
  Link as LinkIcon,
  Minus,
  Undo,
  Redo,
  Loader2,
} from "lucide-react";

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function TipTapEditor({
  content,
  onChange,
  placeholder = "Write your technical news story or guide...",
}: TipTapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = React.useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-accent underline font-medium hover:opacity-80 transition-opacity",
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-2xl border border-border/80 shadow-md my-6 w-full max-h-[500px] object-cover",
        },
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose prose-zinc dark:prose-invert max-w-none focus:outline-hidden min-h-[380px] px-6 py-5 text-sm sm:text-base leading-relaxed text-foreground",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setIsUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      editor.chain().focus().setImage({ src: data.media.url, alt: file.name }).run();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Could not upload image to Vercel Blob";
      alert(msg);
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSetLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter link URL:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  if (!editor) {
    return (
      <div className="h-64 rounded-2xl border border-border bg-surface/30 flex items-center justify-center text-xs font-mono text-muted-foreground">
        Initializing Newsroom Editor...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/80 bg-background/50 overflow-hidden shadow-xs focus-within:ring-2 focus-within:ring-accent/30 transition-all">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 p-2 bg-surface/90 backdrop-blur-md border-b border-border/70 text-xs">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            editor.isActive("heading", { level: 2 })
              ? "bg-accent text-accent-foreground font-bold"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          }`}
          title="Section Header (H2)"
        >
          <Heading2 className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            editor.isActive("heading", { level: 3 })
              ? "bg-accent text-accent-foreground font-bold"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          }`}
          title="Subsection Header (H3)"
        >
          <Heading3 className="h-4 w-4" />
        </button>

        <div className="h-4 w-[1px] bg-border mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            editor.isActive("bold")
              ? "bg-accent text-accent-foreground font-bold"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          }`}
          title="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            editor.isActive("italic")
              ? "bg-accent text-accent-foreground font-bold"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          }`}
          title="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            editor.isActive("strike")
              ? "bg-accent text-accent-foreground font-bold"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          }`}
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            editor.isActive("code")
              ? "bg-accent text-accent-foreground font-bold"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          }`}
          title="Inline Code"
        >
          <Code className="h-4 w-4" />
        </button>

        <div className="h-4 w-[1px] bg-border mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            editor.isActive("bulletList")
              ? "bg-accent text-accent-foreground font-bold"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          }`}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            editor.isActive("orderedList")
              ? "bg-accent text-accent-foreground font-bold"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          }`}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            editor.isActive("blockquote")
              ? "bg-accent text-accent-foreground font-bold"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          }`}
          title="Editorial Pullquote"
        >
          <Quote className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-1.5 rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground transition-colors cursor-pointer"
          title="Divider Line"
        >
          <Minus className="h-4 w-4" />
        </button>

        <div className="h-4 w-[1px] bg-border mx-1" />

        <button
          type="button"
          onClick={handleSetLink}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            editor.isActive("link")
              ? "bg-accent text-accent-foreground font-bold"
              : "text-muted-foreground hover:bg-surface hover:text-foreground"
          }`}
          title="Insert Hyperlink"
        >
          <LinkIcon className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploadingImage}
          className="p-1.5 rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground transition-colors cursor-pointer flex items-center gap-1"
          title="Upload & Insert Story Image to Vercel Blob"
        >
          {isUploadingImage ? (
            <Loader2 className="h-4 w-4 animate-spin text-accent" />
          ) : (
            <ImageIcon className="h-4 w-4 text-accent" />
          )}
          <span className="text-[11px] font-medium hidden sm:inline">Add Image</span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInlineImageUpload}
          className="hidden"
        />

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground disabled:opacity-30 transition-colors cursor-pointer"
            title="Undo"
          >
            <Undo className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-surface hover:text-foreground disabled:opacity-30 transition-colors cursor-pointer"
            title="Redo"
          >
            <Redo className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
