import React, { useState, useEffect } from "react";
import "../css/articles.css";
import axios from "axios";

import { useParams } from "react-router-dom";

function Articles() {
  const [posts, setPosts] = useState([]);

  const { topic } = useParams();

  useEffect((filteredTopics) => {
    axios
      .get(`https://adam-nc-news.herokuapp.com/api/articles?topic=${topic}`)
      .then((res) => {
        setPosts(res.data.articles);
      })

      .catch((err) => {});
  });

  return (
    <ul>
      {posts.map((post) => (
        <section className="post-card">
          <div className="post-details">
            <div className="post-name-desc">
              <p className="post-title">TITLE:</p>
              {post.title}
              <p className="post-body">BODY:</p>
              {post.body}
              <p className="post-topic">#TOPIC </p>#{post.topic}
              <p className="post-comments">COMMENT COUNT: </p>
              {post.comment_count}
              <p className="post-author">WRITTEN BY:</p>@{post.author}
              <p className="post-created-at">CREATED AT:</p>
              {post.created_at}
              <p className="post-vote-count">VOTE COUNT:</p>
              {post.votes}
            </div>
          </div>
        </section>
      ))}
    </ul>
  );
}

export default Articles;
