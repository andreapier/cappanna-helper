import PropTypes from "prop-types";
import React from "react";
import SidebarNavigationItem from "./SidebarNavigationItem";
import { List, withStyles } from "@material-ui/core";
import sidebarStyle from "variables/styles/sidebarStyle";
// import { isRouteActive } from "routes/helpers";

const Links = (props) => {
    const {
        classes,
        routes,
        user,
        handleSidebarNavigationItemClick
        // match,
        // location
    } = props;

    return (
        <div className={classes.sidebarWrapper}>
            <List className={classes.list}>
                {routes.map((routeData, key) => {
                    const itemProps = {
                        routeData,
                        user,
                        handleSidebarNavigationItemClick
                    };
                    //active: isRouteActive(routeData.name, match)

                    return <SidebarNavigationItem {...itemProps} key={key} />;
                })}
            </List>
        </div>
    );
};

Links.propTypes = {
    classes: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired
    // location: PropTypes.shape({
    //   path: PropTypes.string.isRequired
    // }).isRequired
};

export default withStyles(sidebarStyle)(Links);
