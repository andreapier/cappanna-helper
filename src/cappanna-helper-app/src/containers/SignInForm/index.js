import React, { Component } from "react";
import { signinRequested } from "actions";
import Button from "components/CustomButtons";
import ItemGrid from "components/Grid/ItemGrid";
import Grid from "components/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Checkbox, TextField } from "redux-form-material-ui";
import { getDefaultRoute } from "routes/helpers";
import history from "./../../history";

class SignIn extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.user.token!==this.props.user.token) {
      history.push(getDefaultRoute(this.props.user.roles[0]));
    }
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.signinRequested)}>
        <Grid justify="space-between">
          <ItemGrid xs={12}>
            <Field
              name="username"
              component={TextField}
              autoFocus
              fullWidth
              label="Username"
            />
          </ItemGrid>
          <ItemGrid xs={12}>
            <Field
              name="password"
              component={TextField}
              type="password"
              fullWidth
              label="Password"
            />
          </ItemGrid>
          <ItemGrid xs={12} md={3}>
            <FormControlLabel
              control={<Field name="rememberMe" color="primary" component={Checkbox} />}
              label="Ricordami"
            />
          </ItemGrid>
          <ItemGrid xs={12} md={3}>
            <Button type="submit" fullWidth>
              Sign in
            </Button>
          </ItemGrid>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps  = state => {
  return  {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signinRequested: ({ username, password, rememberMe }) =>
      dispatch(signinRequested({ username, password, rememberMe }))
  };
};

export default reduxForm({
  form: "signinForm"
})(connect(mapStateToProps, mapDispatchToProps)(SignIn));
