import TypeAnimation from "@/components/layouts/elements/type_animation";

export default function Introduction() {
  return (
    <section>
      <div className="text-xl md:text-3xl font-bold relative">
        <TypeAnimation
          sequence={[
            "Hi, I'm Muhammad Nur Maulana",
            "Hi, I'm Frontend Developer",
          ]}
          delay={3000}
        />
      </div>
      <div className="my-10">
        <p>
          A passionate Frontend Developer specializing in turning creative ideas
          into seamless and responsive web interfaces. Skilled in HTML, CSS,
          JavaScript, and ReactJs, I focus on writing clean, maintainable code
          and thrive in collaborative team environments.
        </p>
      </div>
    </section>
  );
}
