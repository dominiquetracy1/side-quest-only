import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuestBoard from "./pages/QuestBoard";

const QuestMap = lazy(() => import("./pages/QuestMap"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/board" element={<QuestBoard />} />
      <Route
        path="/map"
        element={
          <Suspense fallback={<div>Loading map...</div>}>
            <QuestMap />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
