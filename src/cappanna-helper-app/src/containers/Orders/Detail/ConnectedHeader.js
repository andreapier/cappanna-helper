import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "components/Orders/Detail/Header";
import { printRequested, editOrder } from "actions";
import history from "./../../../history";

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
      status: 0,
      details: []
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
    result.order.details = state.selectedOrder.item.details
      .map(e => {
        return {
          id: e.item.id,
          group: e.item.group,
          name: e.item.name,
          quantity: e.quantity,
          price: e.item.price
        };
      })
      .concat(
        state.menuDetails.items
          .filter(d => state.selectedOrder.item.details.find(e => e.id === d.id))
          .map(e => {
            return {
              ...e,
              quantity: 0
            };
          })
      );
  }

  return result;
};

const mapDispatchToProps = dispatch => {
  return {
    printRequested: orderId => dispatch(printRequested(orderId)),
    editOrder: order => {
      dispatch(editOrder(order));
      history.push(`/order/${order.id}/edit`);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedHeader);
