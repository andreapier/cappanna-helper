import React from "react";
import PropTypes from "prop-types";
import { ListItemButton, ListItemText } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { NavLink } from "react-router-dom";
import sidebarStyle from "variables/styles/sidebarStyle";

const useStyles = makeStyles(sidebarStyle);

const Preview = (props) => {
    const classes = useStyles();
    const text = `Utente ${props.user.userName}`;

    return (
        <NavLink to={`/user/${props.user.id}`} className={classes.item}>
            <ListItemButton className={classes.itemLink}>
                <ListItemText primary={text} className={classes.itemText} disableTypography />
            </ListItemButton>
        </NavLink>
    );
};

Preview.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired
    }),
};

export default Preview;
