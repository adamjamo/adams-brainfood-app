import React, { useState } from "react";

export default function SortComponent({
  articleData,
  setArticleData,
  article_id,
}) {
  const [MyArray, setMyArray] = useState([]);
  {
    const [sortStatus, setSortStatus] = useState([]);

    const handleSort = () => {
      if (sortStatus) {
        let sorted = articleData.sort((a, b) => a[1] - b[1]);
        setArticleData(sorted);
        setSortStatus(!sortStatus);
      } else {
        let sorted = articleData.sort((a, b) => b[1] - a[1]);
        setMyArray(sorted);
        setSortStatus(!sortStatus);
      }
    };

    return (
      <>
        <button onClick={handleSort}>ClickMe to Sort</button>
        {MyArray}
      </>
    );
  }
}
