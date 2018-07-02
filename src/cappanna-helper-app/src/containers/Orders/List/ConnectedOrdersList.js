import React, { Component } from "react";
import { connect } from "react-redux";
import { loadOrdersListRequested, invalidateOrdersList } from "actions";
import List from "components/Orders/List";

class ConnectedOrdersList extends Component {
  componentDidMount() {
    if (this.props.shouldLoad) {
      this.props.loadOrdersListRequested();
    }
  }

  render() {
    return <List orders={this.props.orders} />;
  }

  componentWillUnmount() {
    if (this.props.loaded) {
      this.props.invalidateOrdersList();
    }
  }
}

const mapStateToProps = state => {
  return {
    shouldLoad: !state.orders.loading && !state.orders.loaded,
    orders: state.orders.items,
    loaded: state.orders.loaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadOrdersListRequested: () => dispatch(loadOrdersListRequested()),
    invalidateOrdersList: () => dispatch(invalidateOrdersList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedOrdersList);
