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
    orders: state.orders.items
      .filter(o => {
        if (state.orders.filters.user) {
          return o.createdById === state.user.userId;
        }

        if (state.orders.filters.stand) {
          return o.standId === state.user.settings.standId;
        }

        return true;
      })
      .filter(o => {
        if (state.orders.filters.status) {
          return o.status < 4;
        }

        return true;
      })
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
