import { PageTransition } from "@/components/animations/PageTransition";

export default function SiteTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
