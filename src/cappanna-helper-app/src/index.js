import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
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

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
    root.render((
        <StrictMode>
            <App store={store} theme={theme} />
        </StrictMode>
    ));
};

renderApp();

if (module.hot) {
    module.hot.accept("components/App", renderApp);
}
