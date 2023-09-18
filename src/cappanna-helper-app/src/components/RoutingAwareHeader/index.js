import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { getActiveRoute } from "routes/helpers";
import Menu from "@mui/icons-material/Menu";
import { AppBar, Hidden, IconButton, Toolbar, Typography } from "@mui/material";
import { withStyles } from '@mui/styles';
import headerStyle from "variables/styles/headerStyle";

function RoutingAwareHeader(props) {
    const { classes, handleDrawerToggle, routes } = props;
    const location = useLocation();
    const selectedRoute = getActiveRoute(routes, location);
    let title = selectedRoute.headerTitle;

    if (selectedRoute.redirect) {
        title = "";
    }

    return (
        <div className={classes.flex.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggle}
                            size="large">
                            <Menu />
                        </IconButton>
                    </Hidden>
                    <Typography variant="h6" color="inherit" className={classes.flex.flex}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

RoutingAwareHeader.propTypes = {
    handleDrawerToggle: PropTypes.func.isRequired,
};

export default withStyles(headerStyle)(RoutingAwareHeader);
