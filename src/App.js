import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import DeleteComment from "./components/DeleteComment";
import IndividualArticle from "./components/IndividualArticle";
import ErrorPage from "./components/ErrorPage";
import Navbar from "./components/Nav";
import "./css/App.css";

import Articles from "./components/Articles";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <>
          <Header />

          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<HomePage />} />
            <Route path="/articles/topics/:topic" element={<Articles />} />

            <Route path="/comments/:comment_id" element={<DeleteComment />} />

            <Route
              path="/articles/:article_id"
              element={<IndividualArticle />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </>
      </BrowserRouter>
    </>
  );
}
