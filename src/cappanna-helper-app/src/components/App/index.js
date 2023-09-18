import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import NavigateSetter from "./NaviagteSetter";
import ThemedApp from "./ThemedApp";

const App = props => {
        return (
            <Provider store={props.store}>
                <BrowserRouter>
                    <NavigateSetter />
                    <StyledEngineProvider injectFirst>
                        <MuiThemeProvider theme={props.theme}>
                            <ThemedApp />
                        </MuiThemeProvider>
                    </StyledEngineProvider>
                </BrowserRouter>
            </Provider>
        );
}

App.propTypes = {
    store: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default App;
