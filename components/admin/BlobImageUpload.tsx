"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, X, Loader2, Link as LinkIcon } from "lucide-react";

interface BlobImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  aspectRatio?: "video" | "square" | "wide";
}

export function BlobImageUpload({
  value,
  onChange,
  label = "Cover Image",
  helperText = "Upload high-res PNG, JPG, or WebP to Vercel Blob.",
  aspectRatio = "video",
}: BlobImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [manualUrl, setManualUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setErrorMsg("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image to Vercel Blob");
      }

      onChange(data.media.url);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Upload error");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    onChange("");
    setManualUrl("");
  };

  const handleManualUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualUrl.trim()) {
      onChange(manualUrl.trim());
      setShowUrlInput(false);
    }
  };

  const aspectClass =
    aspectRatio === "video"
      ? "aspect-video"
      : aspectRatio === "wide"
      ? "aspect-[21/9]"
      : "aspect-square";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-[11px] font-mono text-accent hover:underline flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon className="h-3 w-3" />
          <span>{showUrlInput ? "Upload File instead" : "Or enter image URL"}</span>
        </button>
      </div>

      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="url"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            placeholder="https://example.com/image.png"
            className="flex-1 px-3.5 py-2 rounded-xl border border-border bg-background text-xs text-foreground focus:outline-hidden focus:ring-2 focus:ring-accent/40"
          />
          <button
            type="button"
            onClick={handleManualUrlSubmit}
            className="px-3.5 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
          >
            Apply URL
          </button>
        </div>
      )}

      {value ? (
        <div
          className={`relative ${aspectClass} w-full rounded-2xl overflow-hidden border border-border/80 bg-background group shadow-xs`}
        >
          <img
            src={value}
            alt="Uploaded Preview"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-background/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-foreground text-background text-xs font-semibold hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer shadow-xs"
            >
              Change Image
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer shadow-xs"
              title="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`relative ${aspectClass} w-full rounded-2xl border-2 border-dashed border-border/80 hover:border-accent/50 bg-surface/30 hover:bg-surface/60 transition-colors flex flex-col items-center justify-center p-6 text-center cursor-pointer group`}
        >
          <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-2 group-hover:scale-105 transition-transform">
            {isUploading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <UploadCloud className="h-5 w-5" />
            )}
          </div>
          <p className="font-sans font-bold text-xs text-foreground">
            {isUploading ? "Uploading to Vercel Blob..." : "Click or drop image to upload to Vercel Blob"}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{helperText}</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
        className="hidden"
      />

      {errorMsg && (
        <p className="text-xs text-red-500 font-medium">{errorMsg}</p>
      )}
    </div>
  );
}
