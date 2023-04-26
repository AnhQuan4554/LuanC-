import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Payment from "./component/Home/Payment";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Payment />} />
      </Routes>
    </>
  );
}

export default App;
