import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetOrder, loadOrdersListRequested, toggleOrdersListFilterByUser, toggleOrdersListFilterByStand, toggleOrdersListFilterByStatus } from "actions";
import { selectIsAdmin, selectIsAdminOrDome } from "selectors";
import { Toolbar, withStyles } from "@material-ui/core";
import ContentAdd from "@material-ui/icons/Add";
import IconButton from "components/CustomButtons/IconButton";
import PermIdentity from "@material-ui/icons/PermIdentity";
import Public from "@material-ui/icons/Public";
import Storefront from "@material-ui/icons/Storefront";
import Lock from "@material-ui/icons/Lock";
import LockOpen from "@material-ui/icons/LockOpen";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import NavigationRefresh from "@material-ui/icons/Refresh";

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
            <IconButton onClick={goToNewOrder} customClass={props.classes.icon}>
                <ContentAdd />
            </IconButton>
            <IconButton onClick={doLoadOrdersListRequested} customClass={props.classes.icon}>
                <NavigationRefresh />
            </IconButton>
            <IconButton onClick={doToggleOrdersListFilterByUser} customClass={props.classes.icon}>
                {filters.user ? <SupervisorAccount /> : <PermIdentity />}
            </IconButton>
            {showToggleOrdersListFilterByStand ? (
                <IconButton onClick={doToggleOrdersListFilterByStand} customClass={props.classes.icon}>
                    {filters.stand ? <Storefront /> : <Public />}
                </IconButton>
            ) : null}
            {showToggleOrdersListFilterByStatus ? (
                <IconButton onClick={doToggleOrdersListFilterByStatus} customClass={props.classes.icon}>
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
