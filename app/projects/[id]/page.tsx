import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiGithub } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";
import { projects } from "@/common/constant/projects";
import { MarkdownBlock } from "@/module/project/components/markdown_block";
import ButtonBack from "@/components/layouts/elements/button_back";

export async function generateMetadata({ params }: any) {
  const { id } = await params;
  const project = projects.find((p) => p.slug === id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Project Details`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: any) {
  const { id } = await params;
  const project = projects.find((p) => p.slug === id);

  if (!project) {
    notFound();
  }

  const renderContent = (item: any, index: number) => {
    switch (item.type) {
      case "image":
        return (
          <div key={index} className="my-8 rounded-lg overflow-hidden">
            {item.data.map((img: { src: string; alt: string }) => (
              <Image
                key={img.src}
                src={img.src}
                alt={img.alt}
                width={1200}
                height={675}
                className="w-full h-auto object-cover"
              />
            ))}
          </div>
        );
      case "heading":
        return (
          <h2 key={index} className="text-xl font-bold  mt-10 mb-4">
            {item.data[0].text}
          </h2>
        );
      case "subheading":
        return (
          <h3 key={index} className="text-lg font-bold  mt-6 mb-3">
            {item.data[0].text}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="text-sm font-semibold leading-relaxed mb-4">
            {item.data[0].text}
          </p>
        );
      case "markdown":
        return <MarkdownBlock key={index} code={item.data[0].text} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ButtonBack href="/projects" />
        <header className="mb-8">
          <h1 className="text-3xl font-bold my-4 tracking-tight">
            {project.title}
          </h1>
          <div className="flex items-center space-x-3 mb-4">
            {project.tags.map((TagIcon: any, index: number) => (
              <TagIcon key={index} size={20} />
            ))}
          </div>
          <p className="text-sm font-semibold">{project.summary}</p>
          <div className="flex items-center space-x-4 mt-6">
            {project.link.srccode && (
              <Link
                href={project.link.srccode}
                target="_blank"
                className="inline-flex items-center space-x-2  hover:text-blue-700 transition-colors"
              >
                <SiGithub className="h-5 w-5" />
                <span>Source Code</span>
              </Link>
            )}
            {project.link.website && (
              <Link
                href={project.link.website}
                target="_blank"
                className="inline-flex items-center space-x-2  hover:text-cyan-400 transition-colors"
              >
                <FiExternalLink className="h-5 w-5" />
                <span>Website</span>
              </Link>
            )}
          </div>
        </header>

        <hr className="border-gray-800 my-8" />

        <main>
          {project.content.map((item, index) => renderContent(item, index))}
        </main>
      </div>
    </div>
  );
}
