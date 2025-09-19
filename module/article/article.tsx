import Container from "@/components/layouts/elements/container";
import React from "react";
import GetArticle from "./get_article";

export default function Article() {
  return (
    <Container>
      <h1 className="text-center mb-8">
        Welcome to my Article! Your Source for Expert Tips and Insights!
      </h1>
      <GetArticle />
    </Container>
  );
}
