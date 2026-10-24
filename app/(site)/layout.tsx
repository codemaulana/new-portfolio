import { SidebarNav } from "@/components/site/SidebarNav";
import { Footer } from "@/components/site/Footer";
import { AOSInit } from "@/components/animations/AOSInit";
import { NavigationProgressBar } from "@/components/animations/NavigationProgressBar";
import { JsonLdPerson } from "@/components/site/JsonLdPerson";
import { getCachedSiteSettings } from "@/lib/cache-queries";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getCachedSiteSettings();

  const ownerName = settings?.ownerName || "Muhammad Nur Maulana";
  const avatarUrl =
    !settings?.heroAvatarUrl ||
    settings.heroAvatarUrl.includes("unsplash") ||
    settings.heroAvatarUrl.includes("foto.jpeg")
      ? "/profile-avatar.png"
      : settings.heroAvatarUrl;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground atelier-grid-pattern relative">
      <NavigationProgressBar />
      <JsonLdPerson />
      <AOSInit />
      <SidebarNav ownerName={ownerName} avatarUrl={avatarUrl} handle="@codemaulana" />
      <div className="flex-1 flex flex-col md:pl-18 transition-[padding] duration-300 min-w-0">
        <main className="flex-1 pt-20 md:pt-8 min-w-0">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
