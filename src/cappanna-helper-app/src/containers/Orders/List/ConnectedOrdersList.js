import React, { Component } from "react";
import { connect } from "react-redux";
import { loadOrdersListRequested, resetOrder } from "actions";
import List from "components/Orders/List";

class ConnectedOrdersList extends Component {
  componentDidMount() {
    this.props.loadOrdersListRequested();
  }

  render() {
    return <List orders={this.props.orders} />;
  }

  componentWillUnmount() {
    this.props.resetOrder();
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.isFiltered
      ? state.orders.items.filter(o => o.createdById === state.user.userId)
      : state.orders.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadOrdersListRequested: () => dispatch(loadOrdersListRequested()),
    resetOrder: () => dispatch(resetOrder())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedOrdersList);
