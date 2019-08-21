import React from "react";
import ReactDOM from "react-dom";
import App from "containers/App";
import storeGenerator from "./store";
import { loadUserData } from "actions";
import "assets/css/index.css";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme();
const store = storeGenerator();
store.dispatch(loadUserData());

const renderApp = () => {
  ReactDOM.render(
    <App store={store} theme={theme} />,
    document.getElementById("root")
  );
};

renderApp();

if (module.hot) {
  module.hot.accept("containers/App", renderApp);
}
