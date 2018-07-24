import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "components/Orders/Detail/Header";
import { printRequested } from "actions";

class ConnectedHeader extends Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = state => {
  return state.selectedOrder.item
    ? {
        id: state.selectedOrder.item.id,
        totalPrice: state.selectedOrder.item.details.reduce(
          (acc, e) => acc + e.quantity * e.item.price,
          0
        ),
        chTable: state.selectedOrder.item.chTable.split("/")[0],
        tableCategory: state.selectedOrder.item.chTable.split("/")[1] || "",
        seats: state.selectedOrder.item.seats
      }
    : { id: 0, totalPrice: 0, chTable: "", tableCategory: "", seats: 0 };
};

const mapDispatchToProps = dispatch => {
  return { printRequested: orderId => dispatch(printRequested(orderId)) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedHeader);
