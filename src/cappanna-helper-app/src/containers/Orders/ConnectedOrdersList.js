import React, { Component } from "react";
import { connect } from "react-redux";
import OrdersList from "components/Order/OrdersList";
import {
  loadOrderRequested,
  loadOrdersListRequested,
  resetOrder,
  loadMenuDetailsRequested
} from "actions";

class ConnectedOrdersList extends Component {
  render() {
    return <OrdersList {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadOrderRequested: orderId => dispatch(loadOrderRequested(orderId)),
    loadOrdersListRequested: () => dispatch(loadOrdersListRequested()),
    loadMenuDetailsRequested: () => dispatch(loadMenuDetailsRequested()),
    goToNewOrder: () => {
      dispatch(resetOrder());
      ownProps.history.push("/order/new");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ConnectedOrdersList
);
