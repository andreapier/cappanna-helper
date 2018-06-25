import React, { Component } from "react";
import { connect } from "react-redux";
import { loadMenuDetailsRequested } from "actions";
import List from "components/Menu/List";

class MenuTable extends Component {
  componentDidMount() {
    if (this.props.shouldLoad) {
      this.props.loadMenuDetailsRequested();
    }
  }

  render() {
    return <List dishList={this.props.dishList} />;
  }
}

const mapStateToProps = state => {
  return {
    dishList: state.menuDetails.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMenuDetailsRequested: () => dispatch(loadMenuDetailsRequested())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuTable);
