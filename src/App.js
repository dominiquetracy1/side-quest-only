import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuestBoard from "./pages/QuestBoard";
import QuestMap from "./pages/QuestMap";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board" element={<QuestBoard />} />
      <Route path="/map" element={<QuestMap />} />
    </Routes>
  );
}

export default App;
