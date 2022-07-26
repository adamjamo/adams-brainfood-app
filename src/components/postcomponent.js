import React from "react";

import "../css/postcomponent.css";
import DropDown from "./dropdownbox";
export default function PostArticle() {
  return (
    <>
      {
        <form>
          {" "}
          <DropDown />
          <label className="thetitle">
            <input
              class="title-box"
              type="text"
              placeholder="Enter yo name!"
              name="title"
            />{" "}
          </label>
          <label className="thetitle">
            <input
              class="title-box"
              type="text"
              placeholder="Enter the name!"
              name="title"
            />{" "}
          </label>
          <label>
            <input
              class="body-box"
              type="text"
              placeholder="Leave your lovely comments!"
              name="body"
            />{" "}
          </label>
          <input type="submit" value="Submit" />{" "}
        </form>
      }
    </>
  );
}
