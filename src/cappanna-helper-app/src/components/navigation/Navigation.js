import React, { Component } from "react";
import Drawer from "material-ui/Drawer";
import { MenuItem } from "material-ui/Menu";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutRequested, loadOrdersListRequested, resetOrder } from "./../../actions";
import logo from "./logo.png";
import ActionInput from "@material-ui/icons/Input";
import ActionLock from "@material-ui/icons/Lock";
import ActionList from "@material-ui/icons/List";
import ContentAdd from "@material-ui/icons/Add";
import Header from "components/Header";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.loadOrdersListRequested = this.loadOrdersListRequested.bind(this);
    this.logoutRequested = this.logoutRequested.bind(this);
    this.handleCalculator = this.handleCalculator.bind(this);
    this.goToNewOrder = this.goToNewOrder.bind(this);
  }

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  handleClose() {
    this.setState({ open: false });
  }

  loadOrdersListRequested() {
    this.handleClose();
    this.props.loadOrdersListRequested();
  }

  logoutRequested() {
    this.handleClose();
    this.props.logoutRequested();
  }

  handleCalculator() {
    this.handleClose();
    this.props.history.push("/calc");
  }

  goToNewOrder() {
    this.handleClose();
    this.props.resetOrder();
  }

  renderAuthenticatedUserMenuItems() {
    return (
      <div>
        <MenuItem
          primaryText="Nuovo ordine"
          containerElement={<Link to="/order/new" />}
          onClick={this.goToNewOrder}
          leftIcon={<ContentAdd />}
        />
        <MenuItem primaryText="Ordini" onClick={this.loadOrdersListRequested} leftIcon={<ActionList />} />
        <MenuItem primaryText="Logout" onClick={this.logoutRequested} leftIcon={<ActionLock />} />
      </div>
    );
  }

  renderUnauthenticatedUserMenuItems() {
    return (
      <div>
        <MenuItem
          primaryText="Login"
          containerElement={<Link to="/login" />}
          onClick={this.handleClose}
          leftIcon={<ActionInput />}
        />
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header
          title="Cappanna Helper"
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={<img src={logo} alt="Logo" />}
          style={appBarStyle}
        />
        <Drawer docked={false} open={this.state.open} onRequestChange={this.handleClose}>
          {this.props.authenticated
            ? this.renderAuthenticatedUserMenuItems()
            : this.renderUnauthenticatedUserMenuItems()}
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.user ? true : false
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logoutRequested: () => dispatch(logoutRequested()),
    loadOrdersListRequested: () => dispatch(loadOrdersListRequested()),
    resetOrder: () => dispatch(resetOrder())
  };
};

//export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
