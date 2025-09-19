// File: app/projects/page.tsx (atau halaman lain)

import { projects } from "@/common/constant/projects";
import Image from "next/image";
import Link from "next/link";

export default function ProjectListPage() {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.title}
            className={`${
              idx === 0 ? "md:col-span-2" : ""
            } border border-blue-500/50 hover:border-green-900 rounded-md overflow-hidden transition-all duration-300 ease-in-out cursor-pointer`}
          >
            <Image
              src={project.image}
              alt={project.title}
              width={500}
              height={500}
              className={`w-full hover:scale-105 transition-all duration-500 ease-in-out`}
            />
            <div className="my-2 p-3">
              <h1 className="truncate text-lg font-bold ">{project.title}</h1>
              <p className="text-sm text-neutral-700 dark:text-neutral-400 line-clamp-2">
                {project.summary}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
