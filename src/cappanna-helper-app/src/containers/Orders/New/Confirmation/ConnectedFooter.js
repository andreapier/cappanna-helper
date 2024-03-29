import React, { Component } from "react";
import { connect } from "react-redux";
import Footer from "components/Orders/New/Confirmation/Footer";
import { confirmOrder } from "actions";
import { withRouter } from "react-router-dom";

class ConnectedFooter extends Component {
  render() {
    return <Footer {...this.props} />;
  }
}

const mapStateToProps = state => {
  //TODO: Refactor variable stand management
  const standId = state.user.settings.standId;

  return {
    order: {
      ...state.newOrderHeader,
      standId,
      details: state.newOrderDetails
    },
    canConfirm:
      state.newOrderHeader.totalPrice > 0 &&
      state.newOrderHeader.chTable &&
      state.newOrderHeader.seats > 0 &&
      standId > 0 &&
      !state.newOrderDetails
        .filter(d => d.quantity > 0)
        .some(d => {
          const menuDetail = state.menuDetails.find(m => m.id === d.itemId);

          return menuDetail.unitsInStock + d.initialQuantity < d.quantity;
        })
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    goBack: ownProps.history.goBack,
    confirmOrder: order => dispatch(confirmOrder(order))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectedFooter)
);
