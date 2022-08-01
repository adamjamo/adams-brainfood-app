import React, { useState } from "react";

import "../css/App.css";

export default function DeleteComment({
  comment_id,
  commentData,
  setCommentData,
}) {
  const [isLoading, setIsLoading] = useState("");
  const [err, setErr] = useState("");

  const handleDelete = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErr(null);
    fetch(`https://adam-nc-news.herokuapp.com/api/comments/${comment_id}`, {
      method: "DELETE",
    }).then(() => {
      setCommentData((curr) => {
        return commentData.filter((comment) => {
          return comment.comment_id !== comment_id;
        });
      });
      setIsLoading(false);
    });
  };

  return (
    <div>
      {err && { err }}
      {isLoading && <div> Deleting...</div>}
      <button onClick={handleDelete}>Delete Your Comment</button>;
    </div>
  );
}
