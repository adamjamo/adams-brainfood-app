import React, { useState } from "react";

import "../css/App.css";

function HandleCommentSubmit({ article_id }) {
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [commentData, setCommentData] = useState([]);

  return <div>{isLoading && <div> Submitting...</div>}</div>;
}

export default HandleCommentSubmit;
