import React, { Component } from "react";
import { connect } from "react-redux";
import {
  resetOrder,
  loadOrdersListRequested,
  toggleOrdersListFilter
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
    isFiltered: state.orders.isFiltered
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadOrdersListRequested: () => dispatch(loadOrdersListRequested()),
    goToNewOrder: () => {
      dispatch(resetOrder());
      ownProps.history.push("/order/new");
    },
    toggleOrdersListFilter: () => dispatch(toggleOrdersListFilter())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectedHeader)
);
