import React, { useState, useEffect } from "react";
import "../css/articles.css";
import axios from "axios";

import SortComponent from "./SortComponent";
import { Link } from "react-router-dom";

function Articles() {
  const [posts, setPosts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect((filteredTopics) => {
    axios
      .get(`https://adam-nc-news.herokuapp.com/api/articles`)
      .then((res) => {
        setIsLoading(false);
        setPosts(res.data.articles);
      })

      .catch((err) => {});
  });

  return (
    <ul>
      {isLoading && <div className="all-articles-loading">Loading...</div>}
      {posts.map((post) => (
        <section className="post-card">
          <div></div>

          <h1>{post.title}</h1>

          <p> {post.article_id}</p>

          <p>{post.body}</p>

          <p>#{post.topic}</p>

          <p> {post.comment_count}</p>

          <p>@{post.author}</p>

          <p>{post.created_at}</p>

          <p> {post.votes}</p>
          <Link to={`/articles/${post.article_id}`} className="link-to-article">
            Click To Read Article!
          </Link>
        </section>
      ))}
    </ul>
  );
}

export default Articles;
