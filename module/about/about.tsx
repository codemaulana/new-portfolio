import Container from "@/components/layouts/elements/container";
import Story from "./components/story";
import Tiktok from "./components/tiktok";
import Education from "./components/education";

export default function About() {
  return (
    <Container>
      <Story />
      <Education />
      <Tiktok />
    </Container>
  );
}
