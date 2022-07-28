import "../css/App.css";
import { useEffect } from "react";
import { useState } from "react";
import "../css/App.css";

import GetVoteNumber from "./GetVoteNumber";
import HelloNinja from "./HelloNinja";

function IndividualArticle() {
  const articleIdRoute = window.location.pathname;
  const [commentData, setCommentData] = useState([]);
  const [articleData, setArticleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [voteCount, setVoteCount] = useState(0);

  const [err, setErr] = useState("");

  useEffect(() => {
    fetch(`https://adam-nc-news.herokuapp.com/api/articles${articleIdRoute}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setArticleData(() => {
          return data.article;
        });
      });
  }, []);

  useEffect(() => {
    fetch(
      `https://adam-nc-news.herokuapp.com/api/articles${articleIdRoute}/comments`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCommentData(() => {
          return data.comments;
        });
        setIsLoading(false);
      });
  }, []);

  const HandleUpVotes = () => {
    setIsLoading(true);
    setVoteCount(+1);
    setErr(null);
    fetch(`https://adam-nc-news.herokuapp.com/api/articles${articleIdRoute}`, {
      method: "PATCH",
      body: JSON.stringify({
        votes: voteCount,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setArticleData(json.article), setIsLoading(false))

      .catch((err) => {
        setVoteCount(-1);
        setErr("Something went wrong, please try again.");
      });
  };

  const HandleDownVotes = () => {
    setIsLoading(true);
    setVoteCount(-1);
    setErr(null);
    fetch(`https://adam-nc-news.herokuapp.com/api/articles${articleIdRoute}`, {
      method: "PATCH",
      body: JSON.stringify({
        votes: voteCount,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setArticleData(json.article), setIsLoading(false))
      .catch((err) => {
        setVoteCount(+1);
        setErr("Something went wrong, please try again.");
      });
  };

  const HandleNewComment = () => {
    setIsLoading(true);

    setErr(null);
    fetch(
      `https://adam-nc-news.herokuapp.com/api/articles${articleIdRoute}/comments`,
      {
        method: "POST",
        body: JSON.stringify({
          comments: "NEW COMMENT ADDED!",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => setCommentData(json.article), setIsLoading(false))
      .catch((err) => {
        setErr("Something went wrong, please try again.");
      });
  };

  return (
    <div className="Article_container">
      <ul>
        {isLoading && <div>Loading...</div>}
        <button onClick={HandleUpVotes}> VOTE UP</button>
        <button onClick={HandleDownVotes}> VOTE DOWN</button>
        <button onClick={HandleNewComment}> ADD COMMENT</button>
        <li>{articleData.title}</li>
        <p>Votes:{articleData.votes}</p>
        <li> Author: {articleData.author}</li>

        <li>{articleData.body}</li>
      </ul>
      <div className="comment-box">
        Comments:
        {commentData.map((comment) => {
          return (
            <div className="comment_container">
              <ul>
                <li>user:{comment.author}</li>
                <li>Comment votes:{comment.votes}</li>
                <li>{comment.body}</li>
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IndividualArticle;
