import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetOrder, loadOrdersListRequested, toggleOrdersListFilterByUser, toggleOrdersListFilterByStand, toggleOrdersListFilterByStatus } from "actions";
import { selectIsAdmin, selectIsAdminOrDome } from "selectors";
import { Toolbar } from "@mui/material";
import { withStyles } from '@mui/styles';
import ContentAdd from "@mui/icons-material/Add";
import IconButton from "components/CustomButtons/IconButton";
import PermIdentity from "@mui/icons-material/PermIdentity";
import Public from "@mui/icons-material/Public";
import Storefront from "@mui/icons-material/Storefront";
import Lock from "@mui/icons-material/Lock";
import LockOpen from "@mui/icons-material/LockOpen";
import SupervisorAccount from "@mui/icons-material/SupervisorAccount";
import NavigationRefresh from "@mui/icons-material/Refresh";

const style = {
    icon: {
        marginRight: "20px"
    }
};

const Header = (props) => {
    const filters =  useSelector(state => state.orders.filters);
    const showToggleOrdersListFilterByStand = useSelector(selectIsAdminOrDome);
    const showToggleOrdersListFilterByStatus = useSelector(selectIsAdmin);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const doLoadOrdersListRequested = () => dispatch(loadOrdersListRequested());
    const goToNewOrder = () => {
            dispatch(resetOrder());
            navigate("/order/new");
        };
    const doToggleOrdersListFilterByUser = () => dispatch(toggleOrdersListFilterByUser());
    const doToggleOrdersListFilterByStand = () => dispatch(toggleOrdersListFilterByStand());
    const doToggleOrdersListFilterByStatus = () => dispatch(toggleOrdersListFilterByStatus());

    return (
        <Toolbar>
            <IconButton onClick={goToNewOrder} customClass={props.classes.icon} size="large">
                <ContentAdd />
            </IconButton>
            <IconButton
                onClick={doLoadOrdersListRequested}
                customClass={props.classes.icon}
                size="large">
                <NavigationRefresh />
            </IconButton>
            <IconButton
                onClick={doToggleOrdersListFilterByUser}
                customClass={props.classes.icon}
                size="large">
                {filters.user ? <SupervisorAccount /> : <PermIdentity />}
            </IconButton>
            {showToggleOrdersListFilterByStand ? (
                <IconButton
                    onClick={doToggleOrdersListFilterByStand}
                    customClass={props.classes.icon}
                    size="large">
                    {filters.stand ? <Storefront /> : <Public />}
                </IconButton>
            ) : null}
            {showToggleOrdersListFilterByStatus ? (
                <IconButton
                    onClick={doToggleOrdersListFilterByStatus}
                    customClass={props.classes.icon}
                    size="large">
                    {filters.status ? <LockOpen /> : <Lock />}
                </IconButton>
            ) : null}
        </Toolbar>
    );
};

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(style)(Header);
