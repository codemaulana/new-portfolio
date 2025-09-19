import Container from "@/components/layouts/elements/container";
import React from "react";
import ProjectListPage from "./components/list_projects";

export default function Projects() {
  return (
    <Container>
      <h1 className="text-center mb-8">
        Explore My Portfolio: A Collection of My Latest Work and Innovations.
      </h1>
      <ProjectListPage />
    </Container>
  );
}
