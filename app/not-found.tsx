"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoArrowBack, IoHomeOutline } from "react-icons/io5";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-4 font-sans text-gray-200">
      <div className="max-w-lg text-left">
        <p className="mt-2 text-base text-gray-400">Page Not Found Go Back.</p>

        <hr className="my-8 border-gray-800" />

        <div className="flex items-center gap-6">
          <button
            onClick={() => router.back()}
            className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-gray-700 px-5 py-3 text-sm font-medium text-gray-200 transition-colors hover:bg-gray-900 hover:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-black">
            <IoArrowBack size={18} />
            Kembali
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white">
            <IoHomeOutline size={18} />
            Ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
