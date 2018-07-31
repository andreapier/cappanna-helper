import React, { Component } from "react";
import { connect } from "react-redux";
import { setOrderTable, setOrderTableCategory, setOrderSeats } from "actions";
import Header from "components/Orders/New/Header";
import { withRouter } from "react-router-dom";

class ConnectedHeader extends Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    id: state.newOrder.header.id,
    totalPrice: state.newOrder.header.totalPrice,
    chTable: state.newOrder.header.chTable,
    tableCategory: state.newOrder.header.tableCategory,
    seats: state.newOrder.header.seats,
    canConfirm:
      state.newOrder.header.totalPrice > 0 &&
      state.newOrder.header.chTable > 0 &&
      state.newOrder.header.seats > 0
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const confirmLocation = ownProps.location === "/order/new" ? "/order/new/confirm" : "/order/_ORDER_ID_/edit/confirm";
  
  return {
    setOrderTable: table => dispatch(setOrderTable(table)),
    setOrderTableCategory: tableCategory =>
      dispatch(setOrderTableCategory(tableCategory)),
    setOrderSeats: seats => dispatch(setOrderSeats(seats)),
    goToConfirm: id => ownProps.history.push(confirmLocation.replace("_ORDER_ID_", id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectedHeader)
);
