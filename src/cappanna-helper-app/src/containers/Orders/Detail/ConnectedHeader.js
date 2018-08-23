import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "components/Orders/Detail/Header";
import { printRequested, editOrder, deleteOrder, calculate } from "actions";
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
      chTable: 0,
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
    goToCalc: order => {
      dispatch(calculate({
        amount: order.totalPrice,
        paidAmount: order.totalPrice,
        seats: order.seats
      }));
      history.push("/calc");
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedHeader);
