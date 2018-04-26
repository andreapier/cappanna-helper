import React from "react";
import { Route, Redirect } from "react-router-dom";
import { signinRoute } from "routes";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: signinRoute.path,
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
