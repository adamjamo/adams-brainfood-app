import React, { useState, useEffect } from "react";
import "../css/articles.css";

import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

function Articles() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();
  const [articleData, setArticleData] = useState([]);
  const [authorData, setAuthorData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://adam-nc-news.herokuapp.com/api/articles?topic=${topic}`)
      .then((res) => {
        setIsLoading(false);
        setPosts(res.data.articles);
      })

      .catch((err) => {});
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://adam-nc-news.herokuapp.com/api/articles?${searchParams}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setArticleData(() => {
          return data.articles;
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError({ err });
      });
  }, [searchParams]);

  const HandleSortBy = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (event.target.value === "created_at") {
      setSearchParams({ sort_by: "created_at", order: "ASC" });
    } else if (event.target.value === "votesL") {
      setSearchParams({ sort_by: "votes", order: "ASC" });
    } else {
      setSearchParams({ sort_by: event.target.value });
    }
  };
  if (error) {
    return <h2> message={error} </h2>;
  }

  return (
    <ul>
      {isLoading && <div className="topic-articles-loading">Loading...</div>}
      <div className="sortby_container">
        <label for="sortBy"> Sort by:</label>
        <select id="sort" name="sortby" onChange={HandleSortBy}>
          <option value="author">Author</option>
          <option value="title">Title</option>
          <option value="topic">Topic</option>
          <option value="created_at">Newest</option>
          <option value="created_atO">Oldest</option>
          <option value="votes">Top voted</option>
          <option value="votesL">Least voted</option>
        </select>
      </div>
      {posts.map((post) => (
        <section className="post-card">
          <div></div>

          <div className="post-details">
            <ul>
              <h1>{post.title}</h1>

              <p>Article ID: {post.article_id}</p>

              <p>{post.body}</p>
              <p>#{post.topic}</p>

              <p> {post.comment_count}</p>

              <p>@{post.author}</p>

              <p>{post.created_at}</p>
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
