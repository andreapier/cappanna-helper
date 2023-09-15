import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUsersListRequested } from "actions";
import { Toolbar, withStyles } from "@material-ui/core";
import ContentAdd from "@material-ui/icons/Add";
import IconButton from "components/CustomButtons/IconButton";
import NavigationRefresh from "@material-ui/icons/Refresh";

const style = {
    icon: {
        marginRight: "20px"
    }
};

const Header = (props) => {
    const dispatch = useDispatch();
    const doLoadUsersListRequested = () => dispatch(loadUsersListRequested());
    const navigate = useNavigate();
    const goToNewUser = navigate("/user/new");

    return (
        <Toolbar>
            <IconButton onClick={goToNewUser} customClass={props.classes.icon}>
                <ContentAdd />
            </IconButton>
            <IconButton onClick={doLoadUsersListRequested} customClass={props.classes.icon}>
                <NavigationRefresh />
            </IconButton>
        </Toolbar>
    );
};

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(style)(Header);
