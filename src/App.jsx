import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import MapPage from "./pages/MapPage";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/detail/:country" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
