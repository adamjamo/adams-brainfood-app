import "../css/App.css";
import { useEffect } from "react";
import { useState } from "react";
import "../css/App.css";
import HandleVotes from "./HandleVotes";
import Header from "./Header";
import DeleteComment from "./DeleteComment";

import { useParams } from "react-router-dom";

import HandleCommentSubmit from "./HandleCommentSubmit";
import SortComponent from "./SortComponent";

function IndividualArticle() {
  const [commentData, setCommentData] = useState([]);
  const [articleData, setArticleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch(`https://adam-nc-news.herokuapp.com/api/articles/${article_id}`)
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
      `https://adam-nc-news.herokuapp.com/api/articles/${article_id}/comments`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setCommentData(() => {
          return data.comments;
        });
      });
  }, []);

  return (
    <div>
      {err && <div> {err}</div>}
      {isLoading && (
        <div className="individual-articles-loading">Loading...</div>
      )}

      <div className="Article_container">
        <div className="vote-button"></div>
        <ul>
          <li>{articleData.title}</li>
          <p>Votes:{articleData.votes}</p>
          <li> Author: {articleData.author}</li>

          <li>{articleData.body}</li>
          <p>
            <div>
              <HandleVotes
                article_id={articleData.article_id}
                articleData={articleData}
                setArticleData={setArticleData}
              />
            </div>
          </p>
        </ul>

        <div className="comment-box">
          Comments:
          <div>
            <HandleCommentSubmit
              article_id={articleData.article_id}
              articleData={articleData}
              setArticleData={setArticleData}
              commentData={commentData}
              setCommentData={setCommentData}
              comment={commentData.body}
            />
          </div>
          {commentData.map((comment) => {
            return (
              <div key={comment.comment_id} className="comment_container">
                {comment.author === "jessjelly" && (
                  <DeleteComment
                    author={comment.author}
                    article_id={articleData.article_id}
                    articleData={articleData}
                    setArticleData={setArticleData}
                    commentData={commentData}
                    comment_id={comment.comment_id}
                    setCommentData={setCommentData}
                  />
                )}
                <ul>
                  <li>user:{comment.author}</li>
                  <li>Comment votes:{comment.votes}</li>
                  <li>THE COMMENT ID {comment.comment_id}</li>
                  <li>{comment.body}</li>
                </ul>
                <div></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default IndividualArticle;
