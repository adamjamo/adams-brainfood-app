import React, { useState, useEffect } from "react";
import "../css/articles.css";
import SortBy from "./SortComponent";
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
    if (event.target.value === "created_atO") {
      setSearchParams({ sort_by: "created_at", order: "ASC" });
    } else if (event.target.value === "votesL") {
      setSearchParams({ sort_by: "votes", order: "ASC" });
    } else {
      setSearchParams({ sort_by: event.target.value });
      setIsLoading(false);
    }
  };
  if (error) {
    return <h2> message={error} </h2>;
  }

  return (
    <div>
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
    </div>
  );
}

export default Articles;
