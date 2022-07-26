import React, { useState, useEffect } from "react";
import "../css/articles.css";
import axios from "axios";

function FootballFetch() {
  const [posts, setPosts] = useState([]);

  const newArr = [];

  useEffect(() => {
    axios
      .get("https://adam-nc-news.herokuapp.com/api/articles")
      .then((res) => {
        const target = res.data.articles;

        for (let i = 0; i < target.length; i++) {
          if (target[i].topic === "football") {
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

export default FootballFetch;
