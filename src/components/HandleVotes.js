import React, { useState, useEffect } from "react";

import LoadingSpinner from "./LoadingSpinner";
import "../css/styles.css";

function HandleVotes({ article_id, setArticleData, articleData }) {
  const [voteCount, setVoteCount] = useState(0);

  const [err, setErr] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setVoteCount(articleData.votes);
  }, [articleData]);

  const HandleUpVotes = () => {
    setIsLoading(true);
    setVoteCount((curr) => curr + 1);
    setErr(null);
    fetch(`https://adam-nc-news.herokuapp.com/api/articles/${article_id}`, {
      method: "PATCH",
      body: JSON.stringify({
        votes: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setArticleData(json.article);
        setIsLoading(false);
      })
      .catch((err) => {
        setVoteCount(-1);
        setErr("Something went wrong, please try again.");
      });
  };
  const HandleDownVotes = () => {
    setIsLoading(true);
    setVoteCount((curr) => curr - 1);
    setErr(null);
    fetch(`https://adam-nc-news.herokuapp.com/api/articles/${article_id}`, {
      method: "PATCH",
      body: JSON.stringify({
        votes: -1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setArticleData(json.article);
        setIsLoading(false);
      })
      .catch((err) => {
        setVoteCount(+1);
        setErr("Something went wrong, please try again.");
      });
  };

  return (
    <div>
      {err && <div> {err} </div>}

      {isLoading && <LoadingSpinner />}

      <div className="vote-buttons">
        <button className="up-vote-button" onClick={HandleUpVotes}>
          VOTE UP: {articleData.votes}
        </button>

        <button className="down-vote-button" onClick={HandleDownVotes}>
          VOTE DOWN:{articleData.votes}
        </button>
      </div>
    </div>
  );
}

export default HandleVotes;
