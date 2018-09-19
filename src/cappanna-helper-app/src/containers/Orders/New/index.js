import React, { Component } from "react";
import { connect } from "react-redux";
import { resetOrder, loadMenuDetailsRequested } from "actions";
import ConnectedHeader from "containers/Orders/New/ConnectedHeader";
import Body from "containers/Orders/New/Body";
import { withRouter } from "react-router-dom";
import { isNewOrder } from "routes/helpers";

class NewOrder extends Component {
  componentDidMount() {
    if (this.props.needsMenuDetailsLoading) {
      this.props.loadMenuDetailsRequested();
    }
    if (this.props.needsReset) {
      this.props.resetOrder();
    }
  }

  render() {
    return (
      <div>
        <ConnectedHeader />
        <Body />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const newOrder = isNewOrder(ownProps.location);

  return {
    needsReset: newOrder && state.newOrderHeader.id,
    needsMenuDetailsLoading: !state.menuDetails.loaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMenuDetailsRequested: () => dispatch(loadMenuDetailsRequested()),
    resetOrder: () => dispatch(resetOrder())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewOrder)
);
