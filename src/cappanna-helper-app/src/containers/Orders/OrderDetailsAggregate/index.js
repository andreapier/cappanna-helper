import React, { Component } from "react";
import { connect } from "react-redux";
import {
    loadOrdersListRequested,
    resetOrder,
    resetOrderSelectionForAggregation,
    toggleOrderSelectionForAggregation,
    orderDetailsAggregationRequested
} from "actions";
import OrderDetailsAggregate from "components/Orders/OrderDetailsAggregate";

class ConnectedOrderDetailsAggregate extends Component {
    componentDidMount() {
        this.props.loadOrdersListRequested();
    }

    render() {
        return (
            <OrderDetailsAggregate
                orders={this.props.orders}
                toggleOrderSelectionForAggregation={this.props.toggleOrderSelectionForAggregation}
                orderDetailsAggregationRequested={this.props.orderDetailsAggregationRequested}
            />
        );
    }

    componentWillUnmount() {
        this.props.resetOrder();
        this.props.resetOrderSelectionForAggregation();
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.items
            .filter((o) => o.status === 3)
            .map((o) => {
                const selected = state.aggregation.indexOf(o.id);

                return {
                    ...o,
                    selected: selected > -1
                };
            })
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadOrdersListRequested: () => dispatch(loadOrdersListRequested()),
        resetOrder: () => dispatch(resetOrder()),
        resetOrderSelectionForAggregation: () => dispatch(resetOrderSelectionForAggregation()),
        toggleOrderSelectionForAggregation: (orderId) => dispatch(toggleOrderSelectionForAggregation(orderId)),
        orderDetailsAggregationRequested: (ordersId) => dispatch(orderDetailsAggregationRequested(ordersId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedOrderDetailsAggregate);
