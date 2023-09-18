import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    loadOrdersListRequested,
    resetOrder,
    resetOrderSelectionForAggregation,
    toggleOrderSelectionForAggregation,
    orderDetailsAggregationRequested
} from "actions";
import { List } from "@material-ui/core";
import Header from "components/Orders/OrderDetailsAggregate/Header";
import Preview from "components/Orders/OrderDetailsAggregate/Preview";

const OrderDetailsAggregate = (props) => {
    const orders = useSelector(state => state.orders.items);
    const aggregation = useSelector(state => state.aggregation);
    const filteredOrders = orders
        .filter((o) => o.status === 3)
        .map((o) => {
            const selected = aggregation.indexOf(o.id);

            return {
                ...o,
                selected: selected > -1
            };
        });
    const dispatch = useDispatch();
    const handleToggleOrderSelectionForAggregation = (orderId) => dispatch(toggleOrderSelectionForAggregation(orderId));
    const handleOrderDetailsAggregationRequested = (ordersId) => dispatch(orderDetailsAggregationRequested(ordersId));

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
                orderDetailsAggregationRequested={handleToggleOrderSelectionForAggregation}
                ordersId={filteredOrders.filter((o) => o.selected).map((o) => o.id)}
            />
            <List>
                {filteredOrders.map((o) => (
                    <Preview order={o} key={o.id} toggleOrderSelectionForAggregation={handleOrderDetailsAggregationRequested} />
                ))}
            </List>
        </div>
    );
};

export default OrderDetailsAggregate;
