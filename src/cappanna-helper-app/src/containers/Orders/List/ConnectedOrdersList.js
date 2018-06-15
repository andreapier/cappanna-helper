import React, { Component } from "react";
import { connect } from "react-redux";
import { loadOrderRequested, loadOrdersListRequested } from "actions";
import List from "components/Orders/List";

class ConnectedOrdersList extends Component {
  render() {
    return <List {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadOrderRequested: orderId => dispatch(loadOrderRequested(orderId)),
    loadOrdersListRequested: () => dispatch(loadOrdersListRequested())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedOrdersList);
