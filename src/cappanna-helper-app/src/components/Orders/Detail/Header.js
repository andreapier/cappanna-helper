import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Toolbar, withStyles } from "@material-ui/core";
import { printRequested, editOrder, deleteOrder, closeOrder, calculate } from "actions";
import { selectIsAdmin, selectIsAdminOrDome, selectOrderTotalPrice } from "selectors";
import AmountFormat from "components/AmountFormat";
import Print from "@material-ui/icons/Print";
import IconButton from "components/CustomButtons/IconButton";
import Create from "@material-ui/icons/Create";
import Apps from "@material-ui/icons/Apps";
import Delete from "@material-ui/icons/Delete";
import Done from "@material-ui/icons/Done";
import isNotEditable from "utils/isOrderNotEditable";
import { flex } from "variables/styles";

const style = {
    root: {
        ...flex.alignCenter,
        justifyContent: "space-between"
    },
    customerField: {
        width: "90px"
    },
    textField: {
        width: "55px"
    },
    tableField: {
        width: "70px"
    },
    icon: {
        marginRight: "10px"
    }
};

const Header = (props) => {
    const userIsAdmin = useSelector(selectIsAdmin);
    const canCloseOrders = useSelector(selectIsAdminOrDome);

    const id = useSelector(state => state.selectedOrder ? state.selectedOrder.id : 0);
    const totalPrice = useSelector(selectOrderTotalPrice);
    const chTable = useSelector(state => state.selectedOrder ? state.selectedOrder.chTable : "");
    const seats = useSelector(state => state.selectedOrder ? state.selectedOrder.seats : 0);
    const customer = useSelector(state => state.selectedOrder ? state.selectedOrder.customer : "");
    const status = useSelector(state => state.selectedOrder ? state.selectedOrder.status : 0);
    const orderDetails = useSelector(state => state.selectedOrder ? state.selectedOrder.details : []);
    const menuItemDetails = useSelector(state => state.menuDetails);
    const details = orderDetails
        .map((e) => {
            return {
                id: e.id,
                quantity: e.quantity,
                itemId: e.item.id
            };
        })
        .concat(
            menuItemDetails
                .filter((d) => !orderDetails.find((e) => e.itemId === d.id))
                .map((e) => {
                    return {
                        id: 0,
                        quantity: 0,
                        itemId: e.id
                    };
                })
        );

    const order = {
        id,
        totalPrice,
        chTable,
        customer,
        seats,
        status,
        details
    };
    
    const closable = status === 3;
    const notEditable = isNotEditable(status);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const doPrintRequested = () => dispatch(printRequested(id));
    const doEditOrder = () => {
            dispatch(editOrder(order));
            navigate(`/order/${id}/edit`);
        };
        const doDeleteOrder = () => dispatch(deleteOrder(id));
        const doCloseOrder= () => dispatch(closeOrder(id));
        const doGoToCalc= () => {
            dispatch(
                calculate({
                    amount: totalPrice,
                    paidAmount: totalPrice,
                    seats: seats
                })
            );
            navigate("/calc");
        };

    return (
        <div>
            <Toolbar>
                <IconButton onClick={doEditOrder} disabled={notEditable} customClass={props.classes.icon}>
                    <Create />
                </IconButton>
                {userIsAdmin ? (
                    <IconButton onClick={doDeleteOrder} disabled={notEditable} customClass={props.classes.icon}>
                        <Delete />
                    </IconButton>
                ) : null}
                <IconButton onClick={doGoToCalc} customClass={props.classes.icon}>
                    <Apps />
                </IconButton>
                {userIsAdmin ? (
                    <IconButton onClick={doPrintRequested} customClass={props.classes.icon}>
                        <Print />
                    </IconButton>
                ) : null}
                {canCloseOrders ? (
                    <IconButton onClick={doCloseOrder} disabled={!closable} customClass={props.classes.icon}>
                        <Done />
                    </IconButton>
                ) : null}
            </Toolbar>
            <div className={props.classes.root}>
                <div>
                    <TextField label="Tav." className={props.classes.tableField} value={chTable} InputLabelProps={{ shrink: true }} readOnly />
                </div>
                <div>
                    <TextField
                        type="number"
                        label="N° pers"
                        className={props.classes.textField}
                        value={seats}
                        InputLabelProps={{ shrink: true }}
                        readOnly
                    />
                </div>
                <div>
                    <TextField
                        label="Cliente"
                        className={props.classes.customerField}
                        value={customer}
                        InputLabelProps={{ shrink: true }}
                        readOnly
                    />
                </div>
                <div className={props.classes.textField}>
                    Tot: <AmountFormat amount={totalPrice} />
                </div>
            </div>
        </div>
    );
};

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(style)(Header);
