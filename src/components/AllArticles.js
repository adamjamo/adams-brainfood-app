import React, { useState, useEffect } from "react";
import "../css/articles.css";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import SortComponent from "./SortComponent";
import { Link } from "react-router-dom";

function AllArticles() {
  const [posts, setPosts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <ul>
      {error && <div> {error}</div>}
      {isLoading && <div className="all-articles-loading">Loading...</div>}
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

          <h1>{post.title}</h1>
          <br></br>
          <p> {post.article_id}</p>
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
          <Link to={`/articles/${post.article_id}`} className="link-to-article">
            Click To Read Article!
          </Link>
        </section>
      ))}
    </ul>
  );
}

export default AllArticles;
