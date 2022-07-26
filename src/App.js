import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Cooking from "./pages/cooking";
import Post from "./pages/post";
import Football from "./pages/football";
import Navbar from "./components/Nav";
import Coding from "./pages/coding";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <>
          <Header />

          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cooking" element={<Cooking />} />
            <Route path="/coding" element={<Coding />} />
            <Route path="/football" element={<Football />} />
            <Route path="/post" element={<Post />} />
          </Routes>
        </>
      </BrowserRouter>
    </>
  );
}
