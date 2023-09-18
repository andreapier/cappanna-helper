import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUsersListRequested } from "actions";
import { Toolbar } from "@mui/material";
import { makeStyles } from '@mui/styles';
import ContentAdd from "@mui/icons-material/Add";
import IconButton from "components/CustomButtons/IconButton";
import NavigationRefresh from "@mui/icons-material/Refresh";

const useStyles = makeStyles({
    icon: {
        marginRight: "20px"
    }
});

const Header = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const doLoadUsersListRequested = () => dispatch(loadUsersListRequested());
    const navigate = useNavigate();
    const goToNewUser = navigate("/user/new");

    return (
        <Toolbar>
            <IconButton onClick={goToNewUser} customClass={classes.icon} size="large">
                <ContentAdd />
            </IconButton>
            <IconButton
                onClick={doLoadUsersListRequested}
                customClass={classes.icon}
                size="large">
                <NavigationRefresh />
            </IconButton>
        </Toolbar>
    );
};

export default Header;
