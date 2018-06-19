import React, { Component } from "react";
import { connect } from "react-redux";
import { loadOrderRequested, loadOrdersListRequested } from "actions";
import List from "components/Orders/List";

class ConnectedOrdersList extends Component {
  componentDidMount() {
    if (this.props.shouldLoad) {
      this.props.loadOrdersListRequested();
    }
  }

  render() {
    return (
      <List
        orders={this.props.orders}
        loadOrderRequested={this.props.loadOrderRequested}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    shouldLoad: !state.orders.loading && !state.orders.loaded,
    orders: state.orders.items
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
