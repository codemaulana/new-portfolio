"use client";

import React from "react";
import { Coffee, Heart, ExternalLink } from "lucide-react";

export function TrakteerCard() {
  const trakteerUrl = "https://trakteer.id/codemaulana";

  return (
    <section className="p-5 sm:p-6 rounded-2xl border border-border/80 bg-surface/40 backdrop-blur-md shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-14 w-14 rounded-2xl bg-[#008f7a] text-white font-sans font-bold text-2xl flex items-center justify-center shadow-xs shrink-0 select-none">
            M
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h3 className="font-sans font-bold text-base sm:text-lg text-foreground">
                Muhammad Nur Maulana
              </h3>
              <span className="text-xs font-mono text-muted-foreground">@codemaulana</span>
            </div>
            <p className="text-xs text-muted-foreground font-light">
              Support my software engineering writeups and open-source projects via Trakteer
            </p>
            <div className="text-[11px] font-mono text-accent font-medium pt-0.5">
              Trakteer Cendol • Rp5.000 / unit
            </div>
          </div>
        </div>

        <a
          href={trakteerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#be1e2d] hover:bg-[#a61725] text-white text-xs font-semibold tracking-wide transition-all shadow-xs self-start sm:self-auto group"
        >
          <Coffee className="h-4 w-4 group-hover:scale-110 transition-transform" />
          <span>Trakteer Cendol</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </section>
  );
}
