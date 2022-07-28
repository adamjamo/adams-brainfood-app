import React, { useState, useEffect } from "react";
import "../css/articles.css";
import axios from "axios";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Articles() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();

  useEffect((filteredTopics) => {
    axios
      .get(`https://adam-nc-news.herokuapp.com/api/articles?topic=${topic}`)
      .then((res) => {
        setIsLoading(false);
        setPosts(res.data.articles);
      })

      .catch((err) => {});
  });

  return (
    <ul>
      {isLoading && <div>Loading...</div>}
      {posts.map((post) => (
        <section className="post-card">
          <div>
            <Link to={`/${post.article_id}`} className="link-to-article">
              Read Article!
            </Link>
          </div>

          <div className="post-details">
            <ul>
              <li>{post.title}</li>

              <li>Article ID: {post.article_id}</li>

              <li>{post.body}</li>

              <li>#{post.topic}</li>

              <li> {post.comment_count}</li>

              <li>@{post.author}</li>

              <li>{post.created_at}</li>
            </ul>
          </div>
        </section>
      ))}
    </ul>
  );
}

export default Articles;
