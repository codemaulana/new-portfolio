import { Metadata } from "next";
import { ContactForm } from "@/components/site/ContactForm";
import { Mail, MapPin, Sparkles, Clock, ArrowUpRight } from "lucide-react";
import { getCachedSiteSettings } from "@/lib/cache-queries";

export const metadata: Metadata = {
  title: "Contact | Muhammad Nur Maulana",
  description:
    "Get in touch with Muhammad Nur Maulana to discuss software engineering roles, full stack web apps, or technical consulting.",
  alternates: {
    canonical: "https://codemaulana.web.id/contact",
  },
};

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await getCachedSiteSettings();

  const email = settings?.emailPublic || "muhammadnrmaulana@gmail.com";
  const location = settings?.location || "Jakarta, Indonesia";

  return (
    <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16 pb-20 px-4 sm:px-6 pt-2 sm:pt-6">
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent">
          <Sparkles className="h-4 w-4" />
          <span>Get in Touch</span>
        </div>
        <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          Contact
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed font-light">
          Have an engineering project in mind, need software architecture advice, or want to discuss a full-time role? Send a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-border bg-surface/50 shadow-sm">
          <ContactForm />
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl border border-border bg-surface/40 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-foreground font-semibold">
                Availability
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Available for software engineering contracts, selected freelance builds, and full-stack developer roles (remote or hybrid Jakarta).
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <Clock className="h-3.5 w-3.5 text-accent" />
              <span>Usually replies within 24 hours.</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-surface/40 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                Direct Email
              </span>
              <a
                href={`mailto:${email}`}
                className="text-sm font-medium text-foreground hover:text-accent flex items-center gap-1.5 transition-colors"
              >
                <Mail className="h-4 w-4 text-accent" />
                <span>{email}</span>
                <ArrowUpRight className="h-3 w-3 opacity-60" />
              </a>
            </div>

            <div className="space-y-1 pt-2 border-t border-border/40">
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                Location
              </span>
              <div className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-surface/40 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
              Profiles &amp; Links
            </span>
            <div className="space-y-2 text-xs">
              <a
                href="https://github.com/codemaulana"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-foreground hover:text-accent transition-colors py-1 cursor-pointer"
              >
                <span>GitHub — @codemaulana</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-nur-maulana-a13a92290"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-foreground hover:text-accent transition-colors py-1 border-t border-border/40 cursor-pointer"
              >
                <span>LinkedIn — Muhammad Nur Maulana</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://instagram.com/ctizz4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-foreground hover:text-accent transition-colors py-1 border-t border-border/40 cursor-pointer"
              >
                <span>Instagram — @ctizz4</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://www.tiktok.com/@elitescr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-foreground hover:text-accent transition-colors py-1 border-t border-border/40 cursor-pointer"
              >
                <span>TikTok — @elitescr</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
