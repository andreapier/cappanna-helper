import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    loadOrdersListRequested,
    resetOrder,
    resetOrderSelectionForAggregation,
    toggleOrderSelectionForAggregation,
    orderDetailsAggregationRequested
} from "actions";
import { List } from "@mui/material";
import Header from "components/Orders/OrderDetailsAggregate/Header";
import Preview from "components/Orders/OrderDetailsAggregate/Preview";

const OrderDetailsAggregate = () => {
    const orders = useSelector(state => state.orders.items);
    const aggregation = useSelector(state => state.aggregation);
    const filteredOrders = orders
        .filter(o => o.status === 3)
        .map(o => {
            const selected = aggregation.indexOf(o.id);

            return {
                ...o,
                selected: selected > -1
            };
        });
    const dispatch = useDispatch();
    const handleToggleOrderSelectionForAggregation = orderId => dispatch(toggleOrderSelectionForAggregation(orderId));
    const handleOrderDetailsAggregationRequested = ordersId => dispatch(orderDetailsAggregationRequested(ordersId));

    useEffect(() => {
        dispatch(loadOrdersListRequested());

        return () => {
            dispatch(resetOrder());
            dispatch(resetOrderSelectionForAggregation());
        }
    }, [dispatch]);

    return (
        <div>
            <Header
                orderDetailsAggregationRequested={handleOrderDetailsAggregationRequested}
                ordersId={filteredOrders.filter(o => o.selected).map(o => o.id)}
            />
            <List>
                {filteredOrders.map(o => (
                    <Preview order={o} key={o.id} toggleOrderSelectionForAggregation={handleToggleOrderSelectionForAggregation} />
                ))}
            </List>
        </div>
    );
};

export default OrderDetailsAggregate;
