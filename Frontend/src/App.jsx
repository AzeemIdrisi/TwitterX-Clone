import { React, useState } from "react";
import "./App.css";
import Body from "./components/Body.jsx";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div>
      <Body />
      <Toaster />
    </div>
  );
}

export default App;
