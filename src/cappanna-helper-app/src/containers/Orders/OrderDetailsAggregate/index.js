import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadOrdersListRequested,
  invalidateOrdersList,
  resetOrderSelectionForAggregation,
  toggleOrderSelectionForAggregation,
  orderDetailsAggregationRequested
} from "actions";
import OrderDetailsAggregate from "components/Orders/OrderDetailsAggregate";

class ConnectedOrderDetailsAggregate extends Component {
  componentDidMount() {
    if (this.props.shouldLoad) {
      this.props.loadOrdersListRequested();
    }
  }

  render() {
    return (
      <OrderDetailsAggregate
        orders={this.props.orders}
        toggleOrderSelectionForAggregation={
          this.props.toggleOrderSelectionForAggregation
        }
        orderDetailsAggregationRequested={
          this.props.orderDetailsAggregationRequested
        }
      />
    );
  }

  componentWillUnmount() {
    if (this.props.loaded) {
      this.props.invalidateOrdersList();
    }
    this.props.resetOrderSelectionForAggregation();
  }
}

const mapStateToProps = state => {
  return {
    shouldLoad: !state.orders.loading && !state.orders.loaded,
    loaded: state.orders.loaded,
    orders: state.orders.items.filter(o => o.status === 3).map(o => {
      const selected = state.aggregation.find(i => i === o.id);

      return {
        ...o,
        selected: selected > 0
      };
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadOrdersListRequested: () => dispatch(loadOrdersListRequested()),
    invalidateOrdersList: () => dispatch(invalidateOrdersList()),
    resetOrderSelectionForAggregation: () =>
      dispatch(resetOrderSelectionForAggregation()),
    toggleOrderSelectionForAggregation: orderId =>
      dispatch(toggleOrderSelectionForAggregation(orderId)),
    orderDetailsAggregationRequested: () =>
      dispatch(orderDetailsAggregationRequested())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedOrderDetailsAggregate);
