import React, { Fragment } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.scss";
import Detail from "./pages/Detail";
import HomePage from "./pages/Home";
import SearchPage from "./pages/Search";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<Detail />} />
        <Route path="search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
