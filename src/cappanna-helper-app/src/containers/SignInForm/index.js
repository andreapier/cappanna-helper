import React, { Component } from "react";
import PropTypes from "prop-types";
import { signinRequested } from "actions";
import Button from "components/CustomButtons";
import ItemGrid from "components/Grid/ItemGrid";
import Grid from "components/Grid";
import { connect } from "react-redux";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import { getDefaultRoute } from "routes/helpers";
import history from "./../../history";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      rememberMe: false
    };

    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.setRememberMe = this.setRememberMe.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setUsername(event) {
    this.setState({ username: event.target.value });
  }

  setPassword(event) {
    this.setState({ password: event.target.value });
  }

  setRememberMe(event) {
    this.setState({ rememberMe: event.target.checked });
  }

  handleSubmit(event) {
    event.stopPropagation();
    event.preventDefault();

    this.props.signinRequested(this.state);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.token !== this.props.user.token) {
      history.push(getDefaultRoute(this.props.user.roles[0]));
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid justifyContent="space-between">
          <ItemGrid xs={12}>
            <TextField
              name="username"
              autoFocus
              fullWidth
              label="Username"
              value={this.state.username}
              onChange={this.setUsername}
            />
          </ItemGrid>

          <ItemGrid xs={12}>
            <TextField
              name="password"
              type="password"
              fullWidth
              label="Password"
              value={this.state.password}
              onChange={this.setPassword}
            />
          </ItemGrid>

          <ItemGrid xs={12} md={3}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={this.state.rememberMe}
                  onChange={this.setRememberMe}
                />
              }
              label="Ricordami"
            />
          </ItemGrid>

          <ItemGrid xs={12} md={3}>
            <Button type="submit" fullWidth>
              Entra
            </Button>
          </ItemGrid>
        </Grid>
      </form>
    );
  }
}

SignIn.propTypes = {
  user: PropTypes.object,
  signinRequested: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signinRequested: ({ username, password, rememberMe }) =>
      dispatch(signinRequested({ username, password, rememberMe }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
