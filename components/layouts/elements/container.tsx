import AnimateContentPage from "../animate_page";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <main className={`py-24 lg:py-16  ${className}`}>
      <div className="mx-auto max-w-3xl px-5">
        <AnimateContentPage>{children}</AnimateContentPage>
      </div>
    </main>
  );
}
