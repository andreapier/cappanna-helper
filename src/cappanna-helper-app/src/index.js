import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "containers/App";
//import registerServiceWorker from "./registerServiceWorker";
import storeGenerator from "./store";
import { loadUserData } from "actions";

const store = storeGenerator();
store.dispatch(loadUserData());

const renderApp = () => {
  ReactDOM.render(<App store={store} />, document.getElementById("root"));
};

renderApp();

if (module.hot) {
  module.hot.accept("containers/App", () => {
    renderApp();
  });
}

//registerServiceWorker();
