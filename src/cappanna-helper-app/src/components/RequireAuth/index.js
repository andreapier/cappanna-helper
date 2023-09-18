import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ children, roles, redirectTo, ...rest }) => {
  const user = useSelector(state => state.user);
  const isAllowed = user.roles.some((r) => roles.includes(r));

  return (user.token
    ? isAllowed ? (children(rest)) : (<div>Role not allowed</div>)
    : (<Navigate replace to={redirectTo} />)
  );
}

RequireAuth.propTypes = {
  children: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  redirectTo: PropTypes.string.isRequired
};

export default RequireAuth;