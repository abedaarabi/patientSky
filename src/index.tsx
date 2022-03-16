import { enableMapSet } from "immer";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
enableMapSet();
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
