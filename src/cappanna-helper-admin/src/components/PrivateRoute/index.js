import React from "react";
import {
  Route,
  Redirect
} from "react-router-dom";
import routes from 'routes';

const signinRoute = routes.filter(e => e.name === 'signin')[0];

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
