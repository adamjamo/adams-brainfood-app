import React, { useState, useEffect } from "react";
import "../css/articles.css";
import axios from "axios";

function DataFetching(post, user) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://adam-nc-news.herokuapp.com/api/articles")
      .then((res) => {
        console.log(res);
        setPosts(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <ul>
      {posts.map((post) => (
        <section className="post-card">
          <div className="post-details">
            <div className="post-name-desc">
              <p className="post-title">TITLE:{post.title}</p>
              <p className="post-body">BODY:{post.body}</p>
            </div>
            <div className="post-topic">
              <p>#TOPIC {post.topic}</p>
            </div>
          </div>

          <div className="post-data">
            <p className="post-comments">COMMENT COUNT: {post.comment_count}</p>
            <p className="post-author">WRITTEN BY: {post.author}</p>
            <p className="post-created-at">CREATED AT:{post.created_At}</p>
            <p className="post-vote-count">VOTE COUNT:{post.votes}</p>
          </div>
        </section>
      ))}
    </ul>
  );
}

export default DataFetching;
