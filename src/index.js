import React from "react";
import ReactDOM from "react-dom";

import App from "views/App";
import "sass/index.scss";
import { ContextProvider } from "util/combineContexts";

const app = (
  <ContextProvider>
    <App />
  </ContextProvider>
);

ReactDOM.render(app, document.getElementById("root"));
