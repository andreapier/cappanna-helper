import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "components/Orders/New/Confirmation/Header";

class ConnectedHeader extends Component {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    id: state.newOrderHeader.id,
    table: state.newOrderHeader.chTable,
    seats: state.newOrderHeader.seats,
    totalPrice: state.newOrderHeader.totalPrice,
    standId: state.user.settings.standId
  };
};

export default connect(mapStateToProps)(ConnectedHeader);
