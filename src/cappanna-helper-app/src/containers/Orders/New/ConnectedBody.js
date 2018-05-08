import React, { Component } from "react";
import Body from "components/Orders/New/Body";
import { connect } from "react-redux";
import { incrementOrderDetailQuantity } from "actions";

class ConnectedBody extends Component {
  render() {
    return <Body {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    dishList: state.newOrder.details
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    incrementOrderDetailQuantity: (detail, quantity) =>
      dispatch(incrementOrderDetailQuantity(detail, quantity))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedBody);
