import React from "react";
import ReactDOM from "react-dom";
import storeGenerator from "./store";
import "assets/css/index.css";
import App from "./containers/App";
import registerServiceWorker from './registerServiceWorker';

const store = storeGenerator();

const renderApp = () => ReactDOM.render(<App store={store} />, document.getElementById("root"));

renderApp();

if (module.hot) {
  module.hot.accept("./containers/App", () => renderApp());
}

registerServiceWorker();
