import React from "react";
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Toolbar } from "@mui/material";
import { printRequested, editOrder, deleteOrder, closeOrder, calculate } from "actions";
import { selectIsAdmin, selectIsAdminOrDome, selectOrderTotalPrice } from "selectors";
import AmountFormat from "components/AmountFormat";
import Print from "@mui/icons-material/Print";
import IconButton from "components/CustomButtons/IconButton";
import Create from "@mui/icons-material/Create";
import Apps from "@mui/icons-material/Apps";
import Delete from "@mui/icons-material/Delete";
import Done from "@mui/icons-material/Done";
import isNotEditable from "utils/isOrderNotEditable";
import { flex } from "variables/styles";

const PREFIX = 'Header';

const classes = {
    root: `${PREFIX}-root`,
    customerField: `${PREFIX}-customerField`,
    textField: `${PREFIX}-textField`,
    tableField: `${PREFIX}-tableField`,
    icon: `${PREFIX}-icon`
};

const Root = styled('div')({
    [`& .${classes.root}`]: {
        ...flex.alignCenter,
        justifyContent: "space-between"
    },
    [`& .${classes.customerField}`]: {
        width: "90px"
    },
    [`& .${classes.textField}`]: {
        width: "55px"
    },
    [`& .${classes.tableField}`]: {
        width: "70px"
    },
    [`& .${classes.icon}`]: {
        marginRight: "10px"
    }
});

const Header = () => {
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
        <Root>
            <Toolbar>
                <IconButton
                    onClick={doEditOrder}
                    disabled={notEditable}
                    customClass={classes.icon}
                    size="large">
                    <Create />
                </IconButton>
                {userIsAdmin ? (
                    <IconButton
                        onClick={doDeleteOrder}
                        disabled={notEditable}
                        customClass={classes.icon}
                        size="large">
                        <Delete />
                    </IconButton>
                ) : null}
                <IconButton onClick={doGoToCalc} customClass={classes.icon} size="large">
                    <Apps />
                </IconButton>
                {userIsAdmin ? (
                    <IconButton onClick={doPrintRequested} customClass={classes.icon} size="large">
                        <Print />
                    </IconButton>
                ) : null}
                {canCloseOrders ? (
                    <IconButton
                        onClick={doCloseOrder}
                        disabled={!closable}
                        customClass={classes.icon}
                        size="large">
                        <Done />
                    </IconButton>
                ) : null}
            </Toolbar>
            <div className={classes.root}>
                <div>
                    <TextField
                        variant="standard"
                        label="Tav."
                        className={classes.tableField}
                        value={chTable}
                        InputLabelProps={{ shrink: true }}
                        readOnly />
                </div>
                <div>
                    <TextField
                        variant="standard"
                        type="number"
                        label="N° pers"
                        className={classes.textField}
                        value={seats}
                        InputLabelProps={{ shrink: true }}
                        readOnly />
                </div>
                <div>
                    <TextField
                        variant="standard"
                        label="Cliente"
                        className={classes.customerField}
                        value={customer}
                        InputLabelProps={{ shrink: true }}
                        readOnly />
                </div>
                <div className={classes.textField}>
                    Tot: <AmountFormat amount={totalPrice} />
                </div>
            </div>
        </Root>
    );
};

export default Header;
