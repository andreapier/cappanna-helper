import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "components/Orders/Detail/Header";
import {
  printRequested,
  editOrder,
  deleteOrder,
  closeOrder,
  calculate
} from "actions";
import history from "./../../../history";

class ConnectedHeader extends Component {
  render() {
    return (
      <Header
        order={this.props.order}
        editOrder={this.props.editOrder}
        goToCalc={this.props.goToCalc}
        printRequested={
          this.props.isAdmin ? this.props.printRequested : undefined
        }
        deleteOrder={this.props.isAdmin ? this.props.deleteOrder : undefined}
        closeOrder={
          this.props.canCloseOrders ? this.props.closeOrder : undefined
        }
      />
    );
  }
}

const mapStateToProps = state => {
  const result = {
    order: {
      id: 0,
      totalPrice: 0,
      chTable: 0,
      tableCategory: "",
      seats: 0,
      status: 0,
      details: []
    },
    isAdmin: state.user.roles.some(r => r === "admin"),
    canCloseOrders: state.user.roles.some(r => r === "admin" || r === "dome")
  };

  if (state.selectedOrder.item) {
    result.order.id = state.selectedOrder.item.id;
    result.order.totalPrice = state.selectedOrder.item.details.reduce(
      (acc, e) => acc + e.quantity * e.item.price,
      0
    );
    result.order.chTable = parseInt(
      state.selectedOrder.item.chTable.split("\\")[0],
      10
    );
    result.order.tableCategory =
      state.selectedOrder.item.chTable.split("\\")[1] || "";
    result.order.seats = state.selectedOrder.item.seats;
    result.order.status = state.selectedOrder.item.status;
    result.order.notes = state.selectedOrder.item.notes;
    result.order.details = state.selectedOrder.item.details
      .map(e => {
        return {
          id: e.id,
          quantity: e.quantity,
          itemId: e.item.id
        };
      })
      .concat(
        state.menuDetails.items
          .filter(
            d => !state.selectedOrder.item.details.find(e => e.itemId === d.id)
          )
          .map(e => {
            return {
              id: 0,
              quantity: 0,
              itemId: e.id
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
    },
    deleteOrder: orderId => dispatch(deleteOrder(orderId)),
    closeOrder: orderId => dispatch(closeOrder(orderId)),
    goToCalc: order => {
      dispatch(
        calculate({
          amount: order.totalPrice,
          paidAmount: order.totalPrice,
          seats: order.seats
        })
      );
      history.push("/calc");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedHeader);
