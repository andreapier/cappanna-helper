import PropTypes from "prop-types";
import React from "react";
import SidebarNavigationItem from "./SidebarNavigationItem";
import { List } from "@mui/material";
import { makeStyles } from '@mui/styles';
import sidebarStyle from "variables/styles/sidebarStyle";

const useStyles = makeStyles(sidebarStyle);

const Links = (props) => {
    const classes = useStyles();
    const {
        routes,
        user,
        handleSidebarNavigationItemClick
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

                    return <SidebarNavigationItem {...itemProps} key={key} />;
                })}
            </List>
        </div>
    );
};

Links.propTypes = {
    routes: PropTypes.array.isRequired
};

export default Links;
