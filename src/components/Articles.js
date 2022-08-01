import React, { useState, useEffect } from "react";
import "../css/articles.css";
import SortBy from "./SortComponent";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
function Articles() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { topic } = useParams();
  const [articleData, setArticleData] = useState([]);
  const [authorData, setAuthorData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://adam-nc-news.herokuapp.com/api/articles?topic=${topic}`)
      .then((res) => {
        setPosts(res.data.articles);
        setIsLoading(false);
      })

      .catch((err) => {
        setError(err);
      });
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://adam-nc-news.herokuapp.com/api/articles?${searchParams}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(() => {
          return data.articles;
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, [searchParams]);

  if (error) {
    return <ErrorPage />;
  } else
    return (
      <ul>
        {error && { error }}

        {isLoading && <div className="topic-articles-loading">Loading...</div>}

        {posts.map((post) => (
          <section className="post-card">
            <div className="post-details">
              <ul>
                <h1>{post.title}</h1>
                <br></br>
                <p>Article ID: {post.article_id}</p>
                <br></br>

                <em>
                  <p>{post.body}</p>
                </em>
                <br></br>
                <p className="topic-bold">#{post.topic}</p>
                <br></br>
                <p>Comments: {post.comment_count}</p>
                <br></br>
                <p>Article by @{post.author}</p>
                <br></br>

                <Link
                  to={`/articles/${post.article_id}`}
                  className="link-to-article"
                >
                  Click To Read Article!
                </Link>
              </ul>
            </div>
          </section>
        ))}
      </ul>
    );
}

export default Articles;
