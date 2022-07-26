import React from "react";
import axios from "axios";

import { useState } from "react";

import "../css/getauthor.css";

export default function GetAuthor() {
  let x = Math.floor(Math.random() * 30 + 1);

  const [data, setData] = useState("");
  const getData = () => {
    axios.get("https://adam-nc-news.herokuapp.com/api/articles").then((res) => {
      console.log(res);
      console.log(x, "what is x?");
      setData(" " + res.data.articles[x].author + " wrote this article");
    });
  };

  return (
    <div className="click-author">
      <button onClick={getData}> Click to reveal author...</button>
      {data}
    </div>
  );
}
