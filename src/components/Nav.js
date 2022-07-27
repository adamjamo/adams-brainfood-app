import "../css/nav.css";

import { Link } from "react-router-dom";

import React from "react";

import "../css/nav.css";

export default function Navbar() {
  return (
    <nav>
      <div className="container nav-inner">
        <div>
          <Link to="/" className="nav-title-home">
            Home
          </Link>
        </div>
        <div>
          <Link to="/articles/topics/cooking" className="nav-title-cooking">
            Cooking
          </Link>
        </div>

        <div>
          <Link to="/articles/topics/coding" className="nav-title-coding">
            Coding
          </Link>
        </div>
        <div>
          <Link to="/articles/topics/football" className="nav-title-football">
            Football
          </Link>
        </div>
      </div>
    </nav>
  );
}
