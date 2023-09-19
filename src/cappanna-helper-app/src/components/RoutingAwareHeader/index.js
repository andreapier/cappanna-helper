import React from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { getActiveRoute } from "routes/helpers";
import Menu from "@mui/icons-material/Menu";
import { AppBar, Hidden, IconButton, Toolbar, Typography } from "@mui/material";

const PREFIX = 'RoutingAwareHeader';

const classes = {
    appBar: `${PREFIX}-appBar`,
};

const StyledAppBar = styled(AppBar)({
    [`&.${classes.appBar}`]: {
        backgroundColor: "transparent",
        color: "#555555"
    },
});

const RoutingAwareHeader = props => {
    const { handleDrawerToggle, routes } = props;
    const location = useLocation();
    const selectedRoute = getActiveRoute(routes, location);
    let title = selectedRoute.headerTitle;

    if (selectedRoute.redirect) {
        title = "";
    }

    return (
            <StyledAppBar position="static" className={classes.appBar}>
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
                    <Typography variant="h6" color="inherit">
                        {title}
                    </Typography>
                </Toolbar>
            </StyledAppBar>
    );
}

RoutingAwareHeader.propTypes = {
    handleDrawerToggle: PropTypes.func.isRequired,
};

export default RoutingAwareHeader;
