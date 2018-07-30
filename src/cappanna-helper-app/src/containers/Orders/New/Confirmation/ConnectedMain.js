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
    orderData: state.newOrder.details.filter(e => e.quantity > 0).map(e => {
      const menuDetail = state.menuDetails.items.find(d => d.id === e.itemId);

      return {
        itemId: e.itemId,
        name: menuDetail.name,
        price: menuDetail.price,
        quantity: e.quantity,
        totalPrice: menuDetail.price * e.quantity
      };
    })
  };
};

export default connect(mapStateToProps)(ConnectedMain);
