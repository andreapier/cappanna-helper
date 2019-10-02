import React, { Component } from "react";
import { connect } from "react-redux";
import { setOrderTable, setOrderSeats } from "actions";
import Header from "components/Orders/New/Header";
import { withRouter } from "react-router-dom";
import { isNewOrder } from "routes/helpers";

class ConnectedHeader extends Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    id: state.newOrderHeader.id,
    totalPrice: state.newOrderHeader.totalPrice,
    chTable: state.newOrderHeader.chTable,
    standId: state.user.settings.standId,
    seats: state.newOrderHeader.seats,
    canConfirm:
      state.newOrderHeader.totalPrice > 0 &&
      state.newOrderHeader.chTable &&
      state.newOrderHeader.seats > 0 &&
      state.user.settings.standId > 0 &&
      !state.newOrderDetails
        .filter(d => d.quantity > 0)
        .some(d => {
          const menuDetail = state.menuDetails.find(m => m.id === d.itemId);
          return menuDetail.unitsInStock + d.initialQuantity < d.quantity;
        })
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const newOrder = isNewOrder(ownProps.location);
  const confirmLocation = newOrder
    ? "/order/new/confirm"
    : "/order/_ORDER_ID_/edit/confirm";

  return {
    setOrderTable: table => dispatch(setOrderTable(table)),
    setOrderSeats: seats => dispatch(setOrderSeats(seats)),
    goToConfirm: id =>
      ownProps.history.push(confirmLocation.replace("_ORDER_ID_", id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectedHeader)
);
