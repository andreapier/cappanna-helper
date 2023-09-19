import React from "react";
import { styled } from '@mui/material/styles';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUsersListRequested } from "actions";
import { Toolbar } from "@mui/material";
import ContentAdd from "@mui/icons-material/Add";
import IconButton from "components/CustomButtons/IconButton";
import NavigationRefresh from "@mui/icons-material/Refresh";

const PREFIX = 'Header';

const classes = {
    icon: `${PREFIX}-icon`
};

const StyledToolbar = styled(Toolbar)({
    [`& .${classes.icon}`]: {
        marginRight: "20px"
    }
});

const Header = () => {
    const dispatch = useDispatch();

    const doLoadUsersListRequested = () => dispatch(loadUsersListRequested());
    const navigate = useNavigate();
    const goToNewUser = navigate("/user/new");

    return (
        <StyledToolbar>
            <IconButton onClick={goToNewUser} customClass={classes.icon} size="large">
                <ContentAdd />
            </IconButton>
            <IconButton
                onClick={doLoadUsersListRequested}
                customClass={classes.icon}
                size="large">
                <NavigationRefresh />
            </IconButton>
        </StyledToolbar>
    );
};

export default Header;
