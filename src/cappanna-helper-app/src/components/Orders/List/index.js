import React, { useEffect } from "react";
import { loadOrdersListRequested, resetOrder } from "actions";
import Preview from "components/Orders/List/Preview";
import { List } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredOrders } from "selectors";

const OrdersList = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadOrdersListRequested());

        return () => dispatch(resetOrder());
    }, [dispatch]);

    const orders = useSelector(selectFilteredOrders);
    const filters = useSelector(state => state.orders.filters);

    return (
        <List>
            {orders.map((o) => (
                <Preview order={o} filters={filters} key={o.id} />
            ))}
        </List>
    );
};

export default OrdersList;
