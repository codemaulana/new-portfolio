"use client";

import React from "react";
import { Code2 } from "lucide-react";
import {
  NextjsIcon,
  ReactIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  TailwindIcon,
  HTMLIcon,
  CSSIcon,
  ViteIcon,
  LaravelIcon,
  NodeIcon,
  ExpressIcon,
  PostgresIcon,
  PrismaIcon,
  MySQLIcon,
  RedisIcon,
  FirebaseIcon,
  GolangIcon,
  FlutterIcon,
  DockerIcon,
  FigmaIcon,
  GithubBrandIcon,
  SassIcon,
  ReduxIcon,
  ArchitectureIcon,
  AgileIcon,
} from "./BrandIcons";

interface SkillItem {
  name: string;
  category?: string;
  IconComponent: React.ComponentType<{ className?: string }>;
}

export interface DbSkillItem {
  id: string;
  name: string;
  category?: string;
  iconName?: string | null;
  order?: number;
}

interface SkillsMarqueeProps {
  skills?: DbSkillItem[];
}

function getIconForSkill(name: string, iconName?: string | null): React.ComponentType<{ className?: string }> {
  const query = `${name} ${iconName || ""}`.toLowerCase();

  if (query.includes("next")) return NextjsIcon;
  if (query.includes("react")) return ReactIcon;
  if (query.includes("typescript") || query.includes(" ts")) return TypeScriptIcon;
  if (query.includes("javascript") || query.includes(" js")) return JavaScriptIcon;
  if (query.includes("tailwind")) return TailwindIcon;
  if (query.includes("laravel") || query.includes("php")) return LaravelIcon;
  if (query.includes("node")) return NodeIcon;
  if (query.includes("express")) return ExpressIcon;
  if (query.includes("postgres")) return PostgresIcon;
  if (query.includes("prisma")) return PrismaIcon;
  if (query.includes("mysql") || query.includes("sql")) return MySQLIcon;
  if (query.includes("redis")) return RedisIcon;
  if (query.includes("firebase")) return FirebaseIcon;
  if (query.includes("golang") || query.includes(" go")) return GolangIcon;
  if (query.includes("flutter") || query.includes("dart")) return FlutterIcon;
  if (query.includes("docker")) return DockerIcon;
  if (query.includes("figma")) return FigmaIcon;
  if (query.includes("git")) return GithubBrandIcon;
  if (query.includes("sass") || query.includes("scss")) return SassIcon;
  if (query.includes("redux") || query.includes("zustand")) return ReduxIcon;
  if (query.includes("vite")) return ViteIcon;
  if (query.includes("html")) return HTMLIcon;
  if (query.includes("css")) return CSSIcon;
  if (query.includes("agile") || query.includes("scrum")) return AgileIcon;

  return ArchitectureIcon;
}

const DEFAULT_ROW_1: SkillItem[] = [
  { name: "Next.js 16", IconComponent: NextjsIcon },
  { name: "React 19", IconComponent: ReactIcon },
  { name: "TypeScript", IconComponent: TypeScriptIcon },
  { name: "JavaScript", IconComponent: JavaScriptIcon },
  { name: "TailwindCSS", IconComponent: TailwindIcon },
  { name: "Sass", IconComponent: SassIcon },
  { name: "Redux", IconComponent: ReduxIcon },
  { name: "HTML5", IconComponent: HTMLIcon },
  { name: "CSS3", IconComponent: CSSIcon },
  { name: "Vite", IconComponent: ViteIcon },
  { name: "Vitest", IconComponent: ViteIcon },
];

const DEFAULT_ROW_2: SkillItem[] = [
  { name: "Laravel 11", IconComponent: LaravelIcon },
  { name: "Node.js", IconComponent: NodeIcon },
  { name: "Express.js", IconComponent: ExpressIcon },
  { name: "PostgreSQL", IconComponent: PostgresIcon },
  { name: "Prisma ORM", IconComponent: PrismaIcon },
  { name: "MySQL", IconComponent: MySQLIcon },
  { name: "Redis", IconComponent: RedisIcon },
  { name: "Firebase", IconComponent: FirebaseIcon },
  { name: "RESTful API", IconComponent: ArchitectureIcon },
];

const DEFAULT_ROW_3: SkillItem[] = [
  { name: "Flutter (Dart)", IconComponent: FlutterIcon },
  { name: "Golang", IconComponent: GolangIcon },
  { name: "Docker", IconComponent: DockerIcon },
  { name: "Git", IconComponent: GithubBrandIcon },
  { name: "GitHub", IconComponent: GithubBrandIcon },
  { name: "Figma", IconComponent: FigmaIcon },
  { name: "Agile / Scrum", IconComponent: AgileIcon },
  { name: "Clean Architecture", IconComponent: ArchitectureIcon },
];

function SkillPill({ skill }: { skill: SkillItem }) {
  const Icon = skill.IconComponent;

  return (
    <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-border/80 bg-surface/70 hover:bg-surface text-foreground font-medium text-xs sm:text-sm shadow-2xs hover:border-accent/50 hover:scale-105 transition-all duration-200 select-none group shrink-0">
      <div className="h-4 w-4 shrink-0 flex items-center justify-center group-hover:scale-115 transition-transform">
        <Icon className="h-4 w-4" />
      </div>
      <span className="whitespace-nowrap">{skill.name}</span>
    </div>
  );
}

export function SkillsMarquee({ skills }: SkillsMarqueeProps) {
  let row1 = DEFAULT_ROW_1;
  let row2 = DEFAULT_ROW_2;
  let row3 = DEFAULT_ROW_3;

  if (skills && skills.length > 0) {
    const mapped: SkillItem[] = skills.map((s) => ({
      name: s.name,
      category: s.category,
      IconComponent: getIconForSkill(s.name, s.iconName),
    }));

    const chunkSize = Math.ceil(mapped.length / 3);
    row1 = mapped.slice(0, chunkSize);
    row2 = mapped.slice(chunkSize, chunkSize * 2);
    row3 = mapped.slice(chunkSize * 2);

    if (row1.length < 4) row1 = [...row1, ...DEFAULT_ROW_1.slice(0, 4 - row1.length)];
    if (row2.length < 4) row2 = [...row2, ...DEFAULT_ROW_2.slice(0, 4 - row2.length)];
    if (row3.length < 4) row3 = [...row3, ...DEFAULT_ROW_3.slice(0, 4 - row3.length)];
  }

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-foreground font-semibold text-lg sm:text-xl">
          <Code2 className="h-5 w-5 text-accent" />
          <span>Skills</span>
        </div>
        <p className="text-xs text-muted-foreground font-light">
          My coding skills &amp; tech stack
        </p>
      </div>

      <div className="relative w-full overflow-hidden space-y-3.5 py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="animate-marquee-left flex gap-3.5">
          {[...row1, ...row1, ...row1].map((skill, idx) => (
            <SkillPill key={`row1-${skill.name}-${idx}`} skill={skill} />
          ))}
        </div>

        <div className="animate-marquee-right flex gap-3.5">
          {[...row2, ...row2, ...row2].map((skill, idx) => (
            <SkillPill key={`row2-${skill.name}-${idx}`} skill={skill} />
          ))}
        </div>

        <div className="animate-marquee-left flex gap-3.5" style={{ animationDuration: "36s" }}>
          {[...row3, ...row3, ...row3].map((skill, idx) => (
            <SkillPill key={`row3-${skill.name}-${idx}`} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
