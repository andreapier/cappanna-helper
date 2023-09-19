import React from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import { ListItemButton, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import { item, itemLink, itemText} from "variables/styles/sidebarStyle";

const PREFIX = 'Preview';

const classes = {
    item: `${PREFIX}-item`,
    itemLink: `${PREFIX}-itemLink`,
    itemText: `${PREFIX}-itemText`
};

const StyledNavLink = styled(NavLink)(
    { [`&.${classes.item}`]: item, [`& .${classes.itemLink}`]: itemLink, [`& .${classes.itemText}`]: itemText}
);

const Preview = props => {
    const text = `Utente ${props.user.userName}`;

    return (
        <StyledNavLink to={`/user/${props.user.id}`} className={classes.item}>
            <ListItemButton className={classes.itemLink}>
                <ListItemText primary={text} className={classes.itemText} disableTypography />
            </ListItemButton>
        </StyledNavLink>
    );
};

Preview.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        userName: PropTypes.string.isRequired
    }),
};

export default Preview;
