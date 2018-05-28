import React, { Component } from "react";
import { connect } from "react-redux";
import Main from "components/Orders/Confirmation/Main";
import { formatAmount } from "utils/string";

class ConnectedMain extends Component {
  render() {
    return <Main {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    orderData: state.newOrder.details
      .map(e => {
        const menuDetail = state.menuDetails.filter(d => d.id === e.id)[0];

        return {
          name: menuDetail.name,
          price: formatAmount(menuDetail.price, false),
          quantity: e.quantity,
          totalPrice: formatAmount(menuDetail.price * e.quantity, false)
        };
      })
      .filter(e => e.quantity > 0)
  };
};

export default connect(mapStateToProps)(ConnectedMain);
