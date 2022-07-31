import React from "react";

import BRAINFOODLOGO from "../img/BRAINFOODLOGO.PNG";

import "../css/header.css";

export default function Header({ article_id }) {
  return (
    <div>
      <div className="hello-user">Hello @jessjelly!</div>
      <div className="logo-app">
        {
          <a href="/">
            <img class="the-pic" src={BRAINFOODLOGO} />{" "}
          </a>
        }
      </div>
      <div className="text">
        <a href="/">brainfood </a>
      </div>
    </div>
  );
}
