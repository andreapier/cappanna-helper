import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { isNewOrder } from "routes/helpers";
import { setOrderCustomer, setOrderTable, setOrderSeats } from "actions";
import { selectCanConfirmOrder } from "selectors";
import IconButton from "components/CustomButtons/IconButton";
import { TextField } from "@material-ui/core";
import ContentSend from "@material-ui/icons/Send";
import AmountFormat from "components/AmountFormat";

const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
};

const textFieldStyle = {
    width: "55px"
};

const tableFieldStyle = {
    width: "70px"
};

const customerFieldStyle = {
    width: "90px"
};

const Header = () => {
    const id = useSelector(state => state.newOrderHeader.id);
    const totalPrice = useSelector(state => state.newOrderHeader.totalPrice);
    const chTable = useSelector(state => state.newOrderHeader.chTable);
    const seats = useSelector(state => state.newOrderHeader.seats);
    const customer = useSelector(state => state.newOrderHeader.customer);
    const canConfirm = useSelector(selectCanConfirmOrder);
    
    const location = useLocation();
    const navigate = useNavigate();
    const newOrder = isNewOrder(location);
    const confirmLocation = newOrder ? "/order/new/confirm" : `/order/${id}/edit/confirm`;
    const dispatch = useDispatch();
    const setTable = (table) => dispatch(setOrderTable(table));
    const setSeats = (seats) => dispatch(setOrderSeats(seats));
    const setCustomer = (customer) => dispatch(setOrderCustomer(customer));
    const goToConfirm = () => navigate(confirmLocation);
    return (
        <div>
            <div style={containerStyle}>
                <div>
                    <TextField
                        label="Tav."
                        style={tableFieldStyle}
                        value={chTable}
                        onChange={(e) => setTable(e.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </div>
                <div>
                    <TextField
                        label="N° pers"
                        style={textFieldStyle}
                        value={isNaN(seats) ? "" : seats}
                        onChange={(e) => setSeats(parseInt(e.target.value, 10))}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </div>
                <div>
                    <TextField
                        label="Cliente"
                        style={customerFieldStyle}
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                </div>
                <div style={textFieldStyle}>
                    Tot: <AmountFormat amount={totalPrice} />
                </div>
                <div>
                    <IconButton type="submit" disabled={!canConfirm} onClick={() => goToConfirm(id)}>
                        <ContentSend />
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

export default Header;
