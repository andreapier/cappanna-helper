import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemText, withStyles } from "@material-ui/core";
import { NavLink, withRouter } from "react-router-dom";
import sidebarStyle from "variables/styles/sidebarStyle";

const Preview = (props) => {
    const text = `Utente ${props.user.userName}`;

    return (
        <NavLink to={`/user/${props.user.id}`} className={props.classes.item}>
            <ListItem button className={props.classes.itemLink}>
                <ListItemText primary={text} className={props.classes.itemText} disableTypography />
            </ListItem>
        </NavLink>
    );
};

Preview.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired
    }),
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(sidebarStyle)(Preview));
