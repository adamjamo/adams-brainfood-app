import "../css/App.css";
import { useEffect } from "react";
import { useState } from "react";
import "../css/App.css";

function IndividualArticle() {
  const articleIdRoute = window.location.pathname;
  const [commentData, setCommentData] = useState([]);
  const [articleData, setArticleData] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://adam-nc-news.herokuapp.com/api/articles${articleIdRoute}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setArticleData(() => {
          return data.article;
        });
        setIsLoading(false);
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

  return (
    <div className="Article_container">
      <ul>
        <li>{articleData.title}</li>

        <li> Author: {articleData.author}</li>
        <li> Article Votes:{articleData.votes}</li>

        <li className="vote-button">
          <button> Vote this! </button>
        </li>
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
