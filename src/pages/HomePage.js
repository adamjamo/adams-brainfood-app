import React from "react";

import AllArticles from "../components/AllArticles";
import "../css/articles.css";
import "../css/homepage.css";

export default function HomePage() {
  return (
    <>
      <div className="home-welcome"> All Articles:</div>

      <AllArticles />
    </>
  );
}
