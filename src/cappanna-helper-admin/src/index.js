import React from "react";
import ReactDOM from "react-dom";
import storeGenerator from "store";
import "assets/css/index.css";
import App from "containers/App";
import registerServiceWorker from 'registerServiceWorker';
import { loadUserData } from "actions";

const store = storeGenerator();
store.dispatch(loadUserData());

const renderApp = () => ReactDOM.render(<App store={store} />, document.getElementById("root"));

renderApp();

if (module.hot) {
  module.hot.accept("containers/App", () => renderApp());
}

registerServiceWorker();
