import React from "react";

import AllArticles from "../components/AllArticles";

import "../css/articles.css";

export default function HomePage() {
  return (
    <>
      <div className="home-welcome">
        Welcome to the home of Cooking, Coding and Footie!
      </div>
      <AllArticles />
    </>
  );
}
