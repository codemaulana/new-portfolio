"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  UploadCloud,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  FileText,
  AlertCircle,
  Loader2,
  Search,
} from "lucide-react";

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  altText: string | null;
  createdAt: string | Date;
}

interface MediaManagerProps {
  initialMedia: MediaItem[];
}

function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function MediaManager({ initialMedia }: MediaManagerProps) {
  const [mediaList, setMediaList] = useState<MediaItem[]>(initialMedia);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCopy = async (id: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Fallback
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setMediaList((prev) => [data.media, ...prev]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload error";
      setUploadError(msg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this media asset?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/media?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");
      setMediaList((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Could not delete asset. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredMedia = mediaList.filter((item) =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border-2 border-dashed border-border/80 bg-surface/30 hover:border-accent/50 transition-colors flex flex-col items-center justify-center text-center space-y-3">
        <div className="h-12 w-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
          {isUploading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <UploadCloud className="h-6 w-6" />
          )}
        </div>

        <div className="space-y-1">
          <p className="font-sans font-bold text-sm text-foreground">
            {isUploading ? "Uploading to Vercel Blob..." : "Upload files to Vercel Blob Storage"}
          </p>
          <p className="text-xs text-muted-foreground max-w-sm">
            PNG, JPG, SVG, WebP, PDF or audio assets up to 50MB. Files are served through Vercel's Edge CDN.
          </p>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
            id="media-file-input"
          />
          <label
            htmlFor="media-file-input"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground disabled:opacity-50 transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <span>Choose File</span>
          </label>
        </div>

        {uploadError && (
          <div className="flex items-center gap-2 text-xs text-red-500 font-medium">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search assets by filename..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-border bg-surface text-xs text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
          />
        </div>

        <span className="text-xs font-mono text-muted-foreground">
          Showing {filteredMedia.length} of {mediaList.length} files
        </span>
      </div>

      {filteredMedia.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-border/80 bg-surface/20 space-y-2">
          <p className="font-sans font-bold text-sm text-foreground">
            {searchQuery ? "No matching media files" : "No media uploaded yet"}
          </p>
          <p className="text-xs text-muted-foreground">
            {searchQuery
              ? "Try adjusting your search query."
              : "Upload images, banners, or documents to store them in your cloud asset library."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredMedia.map((item) => {
            const isImage = item.mimeType.startsWith("image/");

            return (
              <div
                key={item.id}
                className="group rounded-2xl border border-border/70 bg-surface/40 hover:border-accent/40 overflow-hidden flex flex-col transition-all shadow-2xs"
              >
                <div className="relative aspect-video bg-background/80 flex items-center justify-center overflow-hidden border-b border-border/60">
                  {isImage ? (
                    <img
                      src={item.url}
                      alt={item.altText || item.filename}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 text-muted-foreground">
                      <FileText className="h-8 w-8 text-accent" />
                      <span className="text-[10px] font-mono uppercase">
                        {item.mimeType.split("/")[1] || "FILE"}
                      </span>
                    </div>
                  )}

                  <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-background/90 text-foreground hover:bg-foreground hover:text-background transition-colors shadow-xs"
                      title="Open full asset"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="p-1.5 rounded-lg bg-background/90 text-red-600 hover:bg-red-600 hover:text-white transition-colors shadow-xs cursor-pointer"
                      title="Delete asset"
                    >
                      {deletingId === item.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Trash2 className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <p className="font-sans font-semibold text-xs text-foreground truncate" title={item.filename}>
                      {item.filename}
                    </p>
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                      <span>{formatBytes(item.size)}</span>
                      <span>
                        {new Date(item.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(item.id, item.url)}
                    className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-background hover:bg-surface text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer active:scale-95"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-500" />
                        <span className="text-emerald-500 font-semibold">Copied URL!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
