import "../css/App.css";
import { useEffect } from "react";
import { useState } from "react";
import "../css/App.css";

function IndividualArticle() {
  const articleIdRoute = window.location.pathname;
  const [commentData, setCommentData] = useState([]);
  const [articleData, setArticleData] = useState([]);
  const [isloading, setIsLoading] = useState([]);

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
    <div className="Individual_article_container">
      <div className="Article_container">
        <h2>{articleData.title}</h2>

        <h3> Author: {articleData.author}</h3>
        <h2> Article Votes:{articleData.votes}</h2>

        <h4 className="vote-button">
          <button> Vote this! </button>
        </h4>
        <p>{articleData.body}</p>
      </div>
      <h2 className="comment-box">
        Comments:
        {commentData.map((comment) => {
          return (
            <div className="comment_container">
              <h5>user:{comment.author}</h5>
              <h6>Comment votes:{comment.votes}</h6>
              <p>{comment.body}</p>
            </div>
          );
        })}
      </h2>
    </div>
  );
}
export default IndividualArticle;
