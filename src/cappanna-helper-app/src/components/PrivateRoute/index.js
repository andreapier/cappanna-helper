import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import signinRoute from "routes/users/signin";

const PrivateRoute = ({ component: Component, user, roles, ...rest }) => {
  const isAllowed = user.roles.some(r => roles.includes(r));
  
  return (
    <Route
      {...rest}
    >{
      user.token ?
        isAllowed ? <Component {...rest} />
        : <div>Role not allowed</div>
      : <Redirect
          to={{
            pathname: signinRoute.path,
            state: { from: rest.location }
          }}
        />
    }
    </Route>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  user: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    token: PropTypes.string.isRequired
  }).isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default PrivateRoute;
