import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "components/Orders/Detail/Header";

class ConnectedHeader extends Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = state => {
  return state.selectedOrder.item
    ? {
        totalPrice: state.selectedOrder.item.details.reduce(
          (acc, e) => acc + e.quantity * e.item.price,
          0
        ),
        chTable: state.selectedOrder.item.chTable.split("/")[0],
        tableCategory: state.selectedOrder.item.chTable.split("/")[1] || "",
        seats: state.selectedOrder.item.seats
      }
    : { totalPrice: 0, chTable: "", tableCategory: "", seats: 0 };
};

export default connect(mapStateToProps)(ConnectedHeader);
