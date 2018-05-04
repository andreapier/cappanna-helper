import React from "react";
import { Route, Redirect } from "react-router-dom";
import signinRoute from "routes/users/signin";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.user && rest.user.token ? (
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
