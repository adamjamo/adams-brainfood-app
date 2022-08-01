import React, { useState } from "react";

import AllArticles from "../components/AllArticles";

import "../css/articles.css";

export default function HomePage() {
  const [error, setError] = useState(null);
  return (
    <>
      {error && <div> {error}</div>}
      <div className="home-welcome">
        Welcome to the home of Cooking, Coding and Footie!
      </div>
      <AllArticles />
    </>
  );
}
