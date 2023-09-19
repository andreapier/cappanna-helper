import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';
import React from "react";
import SidebarNavigationItem from "./SidebarNavigationItem";
import { List } from "@mui/material";
import { drawerWidth } from "variables/styles";
const PREFIX = 'Links';

const classes = {
    sidebarWrapper: `${PREFIX}-sidebarWrapper`,
    list: `${PREFIX}-list`,
};

const Root = styled('div')({
    [`& .${classes.sidebarWrapper}`]: {
        height: "calc(100vh - 75px)",
        overflow: "auto",
        width: drawerWidth,
        zIndex: "4",
        overflowScrolling: "touch",
    },
});

const Links = props => {
    const {
        routes,
        user,
        handleSidebarNavigationItemClick
    } = props;

    return (
        <Root className={classes.sidebarWrapper}>
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
        </Root>
    );
};

Links.propTypes = {
    routes: PropTypes.array.isRequired
};

export default Links;
