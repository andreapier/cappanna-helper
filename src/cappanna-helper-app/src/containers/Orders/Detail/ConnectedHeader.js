import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "components/Orders/Detail/Header";

class ConnectedHeader extends Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    totalPrice: state.selectedOrder.details.reduce(
      (acc, e) => acc + e.quantity * e.item.price,
      0
    ),
    chTable: state.selectedOrder.chTable,
    tableCategory: state.selectedOrder.tableCategory,
    seats: state.selectedOrder.seats
  };
};

export default connect(mapStateToProps)(ConnectedHeader);
