// import React from "react";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return <div className="container nav-inner"> hi</div>;
// }

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
          <Link to="/cooking" className="nav-title-cooking">
            Cooking
          </Link>
        </div>
        <div>
          <Link to="/coding" className="nav-title-coding">
            Coding
          </Link>
        </div>
        <div>
          <Link to="/football" className="nav-title-football">
            Football
          </Link>
        </div>
        <div>
          <Link to="/post" className="nav-title-post">
            Post
          </Link>
        </div>
      </div>
    </nav>
  );
}
