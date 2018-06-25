import React, { Component } from "react";
import { connect } from "react-redux";
import Main from "components/Orders/New/Confirmation/Main";

class ConnectedMain extends Component {
  render() {
    return <Main {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    orderData: state.newOrder.details
      .map(e => {
        const menuDetail = state.menuDetails.items.filter(
          d => d.id === e.id
        )[0];

        return {
          name: menuDetail.name,
          price: menuDetail.price,
          quantity: e.quantity,
          totalPrice: menuDetail.price * e.quantity
        };
      })
      .filter(e => e.quantity > 0)
  };
};

export default connect(mapStateToProps)(ConnectedMain);
