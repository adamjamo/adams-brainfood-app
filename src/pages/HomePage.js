import React from "react";
import DataFetching from "../components/article";
import SearchBar from "../components/SearchBar";
import "../css/articles.css";
export default function HomePage({ posts, user }) {
  return (
    <>
      {console.log(posts, "posts see this?")}
      {console.log(user, "user see this?")}
      <SearchBar />
      <DataFetching />
    </>
  );
}
