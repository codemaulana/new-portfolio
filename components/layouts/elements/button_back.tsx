import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function ButtonBack({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="flex items-center cursor-pointer gap-2 hover:gap-5 font-bold transition-all duration-500 text-sm"
    >
      <ArrowLeftCircle className="size-6" />
      Back
    </Link>
  );
}
