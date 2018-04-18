import React, { Component } from "react";
import "./App.css";
import Navigation from "./../navigation/Navigation";
import LoginForm from "./../login/LoginForm";
import OrderForm from "./../order/OrderForm";
import RequireAuthentication from "./../auth/RequireAuthentication";
import { Route } from "react-router-dom";
import LoadingIndicator from "./../loading/LoadingIndicator";
import { Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import OrdersList from "./../order/OrdersList";
import Order from "./../order/Order";
import history from "./../../history";
import ErrorSnackBar from "./../error/ErrorSnackBar";
import OrderConfirmation from "./../order/OrderConfirmation";
import Calculator from "./../calculator/Calculator";

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={history}>
          <div>
            <Navigation />
            <LoadingIndicator />
            <ErrorSnackBar />
            <Route path={"/"} component={RequireAuthentication(OrdersList)} exact />
            <Route path={"/login"} component={LoginForm} />
            <Route path={"/calc"} component={Calculator} />
            <Switch>
              <Route path={"/order"} component={RequireAuthentication(OrdersList)} exact />
              <Route path={"/order/new"} component={RequireAuthentication(OrderForm)} exact />
              <Route path={"/order/confirm"} component={RequireAuthentication(OrderConfirmation)} exact />
              <Route path={"/order/:id"} component={RequireAuthentication(Order)} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
