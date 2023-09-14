import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

const RequireAuth = ({ children, user, roles, redirectTo, ...rest }) => {
  const isAllowed = user.roles.some((r) => roles.includes(r));

  return (user.token
    ? isAllowed ? (children(rest)) : (<div>Role not allowed</div>)
    : (<Redirect to={redirectTo} />)
  );
}

RequireAuth.propTypes = {
  children: PropTypes.func.isRequired,
  user: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    token: PropTypes.string.isRequired
  }).isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  redirectTo: PropTypes.string.isRequired
};

export default RequireAuth;