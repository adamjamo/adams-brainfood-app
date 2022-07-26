import React, { useState, useEffect } from "react";
import "../css/articles.css";
import axios from "axios";

function CodingFetch() {
  const [posts, setPosts] = useState([]);

  const newArr = [];

  useEffect(() => {
    axios
      .get("https://adam-nc-news.herokuapp.com/api/articles")
      .then((res) => {
        const target = res.data.articles;

        for (let i = 0; i < target.length; i++) {
          if (target[i].topic === "coding") {
            newArr.push(target[i]);
          }

          setPosts(newArr);
        }
      })

      .catch((err) => {});
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

export default CodingFetch;
