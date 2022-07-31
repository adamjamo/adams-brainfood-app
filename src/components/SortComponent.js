import { useEffect } from "react";

import { useState } from "react";
import "../css/App.css";

import { useSearchParams } from "react-router-dom";
export default function SortBy() {
  const [articleData, setArticleData] = useState([]);
  const [authorData, setAuthorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);

  console.log(searchParams, "SEEING SEARCH?");

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://https://adam-nc-news.herokuapp.com/api/articles?${searchParams}`
    )
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
  useEffect(() => {
    setIsLoading(true);
    fetch("https://https://adam-nc-news.herokuapp.com/api/users")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAuthorData(data.users);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, []);

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
    </div>
  );
}
