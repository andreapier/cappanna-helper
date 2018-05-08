import React, { Component } from "react";
import { connect } from "react-redux";
import { setOrderTable, setOrderTableCategory, setOrderSeats } from "actions";
import { withRouter } from "react-router";
import Header from "components/Orders/New/Header";

class ConnectedHeader extends Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    totalPrice: state.newOrder.header.totalPrice,
    chTable: state.newOrder.header.chTable,
    tableCategory: state.newOrder.header.tableCategory,
    seats: state.newOrder.header.seats,
    canConfirm:
      state.newOrder.header.totalPrice > 0 &&
      state.newOrder.header.chTable > 0 &&
      state.newOrder.header.seats > 0 &&
      state.newOrder.header.tableCategory !== ""
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setOrderTable: table => dispatch(setOrderTable(table)),
    setOrderTableCategory: tableCategory =>
      dispatch(setOrderTableCategory(tableCategory)),
    setOrderSeats: seats => dispatch(setOrderSeats(seats)),
    goToConfirm: () => ownProps.history.push("/order/confirm")
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(ConnectedHeader)
);
