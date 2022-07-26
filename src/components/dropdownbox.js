import React, { useState } from "react";

import "../css/dropdown.css";

export default function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);

  const handleSelectTopic = (e) => {
    console.log("you have clicked " + e.target);

    setIsOpen(e.target);
  };

  return (
    <div class="main-drop-down">
      <div class="DropDownContainer">
        <div class="DropDownHeader" onClick={toggling}>
          Select your topic!
        </div>
        {isOpen && (
          <div class="DropDownListContainer">
            <div class="DropDownList">
              <div>
                <button
                  class="cooking"
                  onClick={(e) => handleSelectTopic(e)}
                  className="select-your-topic"
                >
                  #Cooking
                </button>
              </div>
              <div>
                <button
                  class="coding"
                  onClick={(e) => handleSelectTopic(e)}
                  className="select-your-topic"
                >
                  #Coding
                </button>
              </div>
              <div>
                <button
                  class="football"
                  onClick={(e) => handleSelectTopic(e)}
                  className="select-your-topic"
                >
                  #Football
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
