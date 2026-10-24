import { PageTransition } from "@/components/animations/PageTransition";

export default function AdminDashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
