import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";

import Navbar from "./components/Nav";

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
            <Route path="/articles/topics/:topic" element={<Articles />} />
          </Routes>
        </>
      </BrowserRouter>
    </>
  );
}
