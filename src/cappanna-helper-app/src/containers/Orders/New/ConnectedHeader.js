import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setOrderTable,
  setOrderTableCategory,
  setOrderSeats,
  resetOrder
} from "actions";
import Header from "components/Orders/New/Header";
import { withRouter } from "react-router-dom";

class ConnectedHeader extends Component {
  componentDidMount() {
    if (this.props.needsReset) {
      this.props.resetOrder();
    }
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const isNewOrder = ownProps.location.pathname === "/order/new";

  return {
    id: state.newOrderHeader.id,
    totalPrice: state.newOrderHeader.totalPrice,
    chTable: state.newOrderHeader.chTable,
    tableCategory: state.newOrderHeader.tableCategory,
    seats: state.newOrderHeader.seats,
    canConfirm:
      state.newOrderHeader.totalPrice > 0 &&
      state.newOrderHeader.chTable > 0 &&
      state.newOrderHeader.seats > 0 &&
      !state.newOrderDetails.some(d => {
        const menuDetail = state.menuDetails.items.find(m => m.id === d.itemId);
        return menuDetail.unitsInStock < d.quantity;
      }),
      needsReset: isNewOrder && state.newOrderHeader.id
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const isNewOrder = ownProps.location.pathname === "/order/new";
  const confirmLocation =isNewOrder
    ? "/order/new/confirm"
    : "/order/_ORDER_ID_/edit/confirm";

  return {
    setOrderTable: table => dispatch(setOrderTable(table)),
    setOrderTableCategory: tableCategory =>
      dispatch(setOrderTableCategory(tableCategory)),
    setOrderSeats: seats => dispatch(setOrderSeats(seats)),
    goToConfirm: id => ownProps.history.push(confirmLocation.replace("_ORDER_ID_", id)),
    resetOrder: () => dispatch(resetOrder())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectedHeader)
);
