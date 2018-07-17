import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import signinRoute from "routes/users/signin";

const PrivateRoute = ({ component: Component, user, roles, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user && user.token ? (
        user.roles.some(r => roles.includes(r)) ? (
          <Component {...props} />
        ) : (
          <div>Role not allowed</div>
        )
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

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired,
  user: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    token: PropTypes.string
  }).isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default PrivateRoute;
