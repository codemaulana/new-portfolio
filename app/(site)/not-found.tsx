import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center space-y-6 py-20 px-4 sm:px-6">
      <div className="p-4 rounded-full border border-border bg-surface text-accent">
        <Compass className="h-8 w-8 animate-spin" style={{ animationDuration: "12s" }} />
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-xs font-mono uppercase tracking-widest text-accent">
          404 • Page Not Found
        </span>
        <h1 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Page Not Found
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
          The link you followed doesn&apos;t exist, was moved, or has a typo in the URL.
        </p>
      </div>

      <div className="pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-xs font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-200"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
