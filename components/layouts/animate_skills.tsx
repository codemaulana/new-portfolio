import Parallax from "@/components/layouts/elements/parallax";

export default function AnimateSkills() {
  return (
    <div className="flex flex-col gap-8">
      <Parallax baseVelocity={2}></Parallax>
      <Parallax baseVelocity={-2}></Parallax>
    </div>
  );
}
