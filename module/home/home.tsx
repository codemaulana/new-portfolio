import Introduction from "./components/introduction";
import Skill from "./components/skill";
import Experience from "./components/experience";
import Container from "@/components/layouts/elements/container";
import LatestArticle from "./components/latest_article";

export default function Home() {
  return (
    <Container>
      <Introduction />
      <Skill />
      <Experience />
      <LatestArticle />
    </Container>
  );
}
