import React, { Component } from "react";
import { connect } from "react-redux";
import {
  resetOrder,
  loadOrdersListRequested,
  toggleOrdersListFilterByUser,
  toggleOrdersListFilterByStand,
  toggleOrdersListFilterByStatus
} from "actions";
import Header from "components/Orders/List/Header";
import { withRouter } from "react-router-dom";

class ConnectedHeader extends Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    filters: state.orders.filters,
    showToggleOrdersListFilterByStand: state.user.roles.some(
      r => r === "admin" || r === "cashier"
    ),
    showToggleOrdersListFilterByStatus: state.user.roles.some(
      r => r === "admin"
    )
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadOrdersListRequested: () => dispatch(loadOrdersListRequested()),
    goToNewOrder: () => {
      dispatch(resetOrder());
      ownProps.history.push("/order/new");
    },
    toggleOrdersListFilterByUser: () =>
      dispatch(toggleOrdersListFilterByUser()),
    toggleOrdersListFilterByStand: () =>
      dispatch(toggleOrdersListFilterByStand()),
    toggleOrdersListFilterByStatus: () =>
      dispatch(toggleOrdersListFilterByStatus())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectedHeader)
);
