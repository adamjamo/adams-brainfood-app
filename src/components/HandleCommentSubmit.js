import React, { useState } from "react";

import { useEffect } from "react";

import "../css/App.css";

function HandleCommentSubmit({ article_id }) {
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const [commentData, setCommentData] = useState([]);

  useEffect(() => {
    setCommentData();
  }, [commentData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    fetch(
      `https://adam-nc-news.herokuapp.com/api/articles/${article_id}/comments`,
      {
        method: "POST",
        body: JSON.stringify({
          username: "jessjelly",
          body: `${newComment}`,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((res) => {
        res.json();
      })
      .then((json) => {
        setCommentData((curr) => {
          return [json.comment, ...curr];
        });
        setNewComment("");
        setIsLoading(false);
      });
  };

  return (
    <div>
      {isLoading && <div> Submitting...</div>}

      <form onSubmit={handleSubmit}>
        <label>
          <input
            className="comment-form"
            value={newComment}
            input
            type="text"
            placeholder="Type away..."
            onChange={(event) => setNewComment(event.target.value)}
          />
          <button
            className="submit-comment"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </label>
        <p></p>
      </form>
    </div>
  );
}

export default HandleCommentSubmit;
