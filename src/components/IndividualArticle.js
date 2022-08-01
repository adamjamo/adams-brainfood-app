import "../css/App.css";
import { useEffect } from "react";
import { useState } from "react";

import HandleVotes from "./HandleVotes";

import DeleteComment from "./DeleteComment";

import { useParams } from "react-router-dom";

function IndividualArticle({ addTask }) {
  const [newComment, setNewComment] = useState("");

  const [commentData, setCommentData] = useState([]);
  const [articleData, setArticleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { article_id } = useParams();
  const [error, setError] = useState(null);
  const [taskInp, setTaskInp] = useState("");

  useEffect(() => {
    fetch(`https://adam-nc-news.herokuapp.com/api/articles/${article_id}`)
      .then((response) => {
        if (response.status === 404) {
          setError(response.status);
        }
        return response.json();
      })
      .then((data) => {
        setArticleData(() => {
          return data.article;
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error");
        setError(err);
      });
  }, [article_id]);

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
      })
      .catch((err) => {
        setError(err);
      });
  }, [article_id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
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
      .then((response) => response.json())
      .then((json) => setCommentData((currData) => [json.comment, ...currData]))
      .catch((err) => {
        setNewComment("");
        setError("Something went wrong, please try again.");
      });
  };

  if (isLoading) {
    return <h1>LOADING</h1>;
  } else if (error) {
    return <h2>{error}: No Such Article</h2>;
  } else
    return (
      <div>
        {error && <div> {error}</div>}
        {isLoading && (
          <div className="individual-articles-loading">Loading...</div>
        )}

        <div className="Article_container">
          <div className="vote-button"></div>
          <ul>
            <h1>{articleData.title}</h1>
            <br></br>
            <p>Votes:{articleData.votes}</p>
            <br></br>
            <p> Author: {articleData.author}</p>
            <br></br>
            <em>
              <p className="article-body">{articleData.body}</p>
            </em>
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
                  onClick={() => {
                    addTask(taskInp);
                    setTaskInp("");
                  }}
                >
                  Submit
                </button>
              </label>
              <p></p>
            </form>
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

                  <h1>User: @{comment.author}</h1>
                  <br></br>
                  <p>Comment votes: {comment.votes}</p>

                  <br></br>
                  <p className="the-comment">{comment.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
}

export default IndividualArticle;
