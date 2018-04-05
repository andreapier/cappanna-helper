import { HeaderLinks } from "components";
import {
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles
} from "material-ui";
import { NavLink } from "react-router-dom";
import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";
import sidebarStyle from "variables/styles/sidebarStyle.jsx";
import { withRouter } from 'react-router-dom';

const signinRoute = routeName => routeName === 'signin';

const Sidebar = ({ ...props }) => {
  const activeRoute = routeName => props.location.pathname.indexOf(routeName) > -1 ? true : false;
  const { classes, color, logo, image, logoText, routes } = props;
  const links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (prop.redirect) {
          return null;
        }

        if (prop.protected && !props.user) {
          return null;
        }
        
        if (props.user && signinRoute(prop.name)) {
          return null;
        }

        const listItemClasses = cx({
          [" " + classes[color]]: activeRoute(prop.path)
        });
        const whiteFontClasses = cx({
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });

        return (
          <NavLink
              to={prop.path}
              className={classes.item}
              activeClassName="active"
              key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                <prop.icon />
              </ListItemIcon>
              <ListItemText
                  primary={prop.sidebarName}
                  className={classes.itemText + whiteFontClasses}
                  disableTypography
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );

  const brand = (
    <div className={classes.logo}>
        <NavLink to="dashboard" className={classes.logoLink}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img} />
          </div>
          {logoText}
        </NavLink>
    </div>
  );

  return (
    <div>
      <Hidden mdUp>
        <Drawer
            variant="temporary"
            anchor="right"
            open={props.open}
            classes={{
            paper: classes.drawerPaper
          }}
            onClose={props.handleDrawerToggle}
            ModalProps={{
            keepMounted: true
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <HeaderLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
            anchor="left"
            variant="permanent"
            open
            classes={{
            paper: classes.drawerPaper
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? 
            <div
                className={classes.background}
                style={{ backgroundImage: "url(" + image + ")" }}
            />
           : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(sidebarStyle)(Sidebar));
