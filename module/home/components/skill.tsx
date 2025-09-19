import AnimateSkills from "@/components/layouts/animate_skills";

export default function Skill() {
  return (
    <section className="border-t-4 border-neutral-400 dark:border-neutral-600 py-4">
      <h1 className="text-xl md:text-3xl font-bold mb-8">Tech Skills</h1>
      <AnimateSkills />
    </section>
  );
}
