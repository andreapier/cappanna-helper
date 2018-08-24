import React, { Component } from "react";
import { connect } from "react-redux";
import { loadMenuDetailsRequested, invalidateMenuDetails, setMenuDetailQuantity } from "actions";
import Menu from "components/Menu";

class MenuTable extends Component {
  componentDidMount() {
    if (this.props.shouldLoad) {
      this.props.loadMenuDetailsRequested();
    }
  }

  render() {
    return <Menu dishList={this.props.dishList} setMenuDetailQuantity={this.props.setMenuDetailQuantity} />;
  }

  componentWillUnmount() {
    if (this.props.loaded) {
      this.props.invalidateMenuDetails();
    }
  }
}

const mapStateToProps = state => {
  return {
    shouldLoad: !state.menuDetails.loading && !state.menuDetails.loaded,
    loaded: state.menuDetails.loaded,
    dishList: state.menuDetails.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMenuDetailsRequested: () => dispatch(loadMenuDetailsRequested()),
    invalidateMenuDetails: () => dispatch(invalidateMenuDetails()),
    setMenuDetailQuantity: (dishId, unitsInStock) => dispatch(setMenuDetailQuantity(dishId, unitsInStock))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuTable);
