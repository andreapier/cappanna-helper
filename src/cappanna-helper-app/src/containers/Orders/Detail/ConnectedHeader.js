import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "components/Orders/Detail/Header";
import { printRequested, editOrder } from "actions";

class ConnectedHeader extends Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = state => {
  const result = {
    order: {
      id: 0,
      totalPrice: 0,
      chTable: "",
      tableCategory: "",
      seats: 0,
      status: 0
    }
  };
  
  if (state.selectedOrder.item) {
    result.order.id = state.selectedOrder.item.id;
    result.order.totalPrice = state.selectedOrder.item.details.reduce(
      (acc, e) => acc + e.quantity * e.item.price,
      0
    );
    result.order.chTable = state.selectedOrder.item.chTable.split("/")[0];
    result.order.tableCategory =
      state.selectedOrder.item.chTable.split("/")[1] || "";
    result.order.seats = state.selectedOrder.item.seats;
    result.order.status = state.selectedOrder.item.status;
  }

  return result;
};

const mapDispatchToProps = dispatch => {
  return {
    printRequested: orderId => dispatch(printRequested(orderId)),
    editOrder: orderId => dispatch(editOrder(orderId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedHeader);
