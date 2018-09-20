import React, { Component } from "react";
import { connect } from "react-redux";
import { loadMenuDetailsRequested, resetOrder, setMenuDetailQuantity } from "actions";
import Menu from "components/Menu";

class MenuTable extends Component {
  componentDidMount() {
    this.props.loadMenuDetailsRequested();
  }

  render() {
    return (
      <Menu
        dishList={this.props.dishList}
        setMenuDetailQuantity={this.props.isAdmin ? this.props.setMenuDetailQuantity : undefined}
      />
    );
  }

  componentWillUnmount() {
    this.props.resetOrder();
  }
}

const mapStateToProps = state => {
  return {
    dishList: state.menuDetails,
    isAdmin: state.user.roles.some(r => r === "admin")
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMenuDetailsRequested: () => dispatch(loadMenuDetailsRequested()),
    resetOrder: () => dispatch(resetOrder()),
    setMenuDetailQuantity: (dishId, unitsInStock) => dispatch(setMenuDetailQuantity(dishId, unitsInStock))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuTable);
