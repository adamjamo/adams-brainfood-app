import { Link } from "react-router-dom";

import React from "react";

import "../css/nav.css";

export default function Navbar() {
  return (
    <nav className="navBar">
      <div className="bar">
        <Link to="/articles">Home</Link>
      </div>
      <div className="bar">
        <Link to="/articles/topics/cooking">Cooling</Link>
      </div>
      <div className="bar">
        <Link to="/articles/topics/coding">Coding</Link>
      </div>
      <div className="bar">
        <Link to="/articles/topics/football">Football</Link>
      </div>
    </nav>
  );
}
