import React, { Component } from "react";
import { connect } from "react-redux";

export default function(ComposedComponent, Roles) {
  class RequireAuthentication extends Component {
    componentWillMount() {
      if (!this.props.user) {
        this.props.history.push("/login");
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.user) {
        this.props.history.push("/login");
      }
    }

    render() {
      if (this.props.user) {
        return <ComposedComponent {...this.props} />;
      } else {
        return null;
      }
    }
  }

  const mapStateToProps = state => {
    return { user: state.user };
  };

  return connect(mapStateToProps)(RequireAuthentication);
}
