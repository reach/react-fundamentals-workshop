import React from "react";
import { unstable_createRoot } from "react-dom";
import "./whatevs/index.css";
import App from "./App.exercise";

unstable_createRoot(
  document.getElementById("root")
).render(<App />);
