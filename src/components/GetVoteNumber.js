import React, { Component, useState, useEffect } from "react";

import axios from "axios";

import HelloNinja from "./HelloNinja";

export default function VoteFunction() {
  const articleIdRoute = window.location.pathname;

  const [votes, setVotes] = useState(0);
  const [newVotes, setNewVotes] = useState(votes);

  useEffect(() => {
    axios
      .get(`https://adam-nc-news.herokuapp.com/api/articles${articleIdRoute}`)
      .then((res) => {
        setVotes(res.data.article.votes);
      })
      .then((set) => {
        console.log(votes, "THIS IS VOTECOUNT");
      })
      .catch((err) => {
        console.log(err, "ERRRRRRR");
      });
  });

  useEffect(() => {
    if (HelloNinja()) {
      setNewVotes(votes + 1);
    }
  });

  return <div>{votes + newVotes} </div>;
}
