import { experience } from "@/common/constant/experience";

export default function Experience() {
  return (
    <section className="border-t-4 border-neutral-400 dark:border-neutral-600 py-4">
      <h1 className="text-xl md:text-3xl font-bold mb-8">Experience</h1>
      <div className="flex flex-col gap-4">
        {experience.map((exp, index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold">{exp.title}</h2>
            <p className="italic text-sm text-neutral-600 dark:text-neutral-300">
              {exp.date}
            </p>
            <p className="my-3">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
