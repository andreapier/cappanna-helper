import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import storeGenerator from "./store";
import { loadUserData } from "actions";
import "assets/css/index.css";
import { createTheme } from "@mui/material/styles";
import { primaryColor } from "variables/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: primaryColor
        },
    },
});
const store = storeGenerator();
store.dispatch(loadUserData());

const renderApp = () => {
    ReactDOM.render(<App store={store} theme={theme} />, document.getElementById("root"));
};

renderApp();

if (module.hot) {
    module.hot.accept("components/App", renderApp);
}
