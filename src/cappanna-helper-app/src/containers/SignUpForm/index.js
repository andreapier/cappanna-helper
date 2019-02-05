import React, { Component } from "react";
import Button from "components/CustomButtons";
import { reduxForm, Field } from "redux-form";
import { TextField } from "@material-ui/core";
import { signupRequested } from "actions";
import { connect } from "react-redux";
import Grid from "components/Grid";
import ItemGrid from "components/Grid/ItemGrid";

class SignUp extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.signupRequested)}>
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
          <ItemGrid xs={12}>
            <Field
              name="confirmPassword"
              component={TextField}
              type="password"
              fullWidth
              label="Conferma password"
            />
          </ItemGrid>
          <ItemGrid xs={12}>
            <Field
              name="firstName"
              component={TextField}
              fullWidth
              label="Nome"
            />
          </ItemGrid>
          <ItemGrid xs={12}>
            <Field
              name="lastName"
              component={TextField}
              fullWidth
              label="Cognome"
            />
          </ItemGrid>
          <ItemGrid xs={12} md={3}>
            <Button type="submit" fullWidth>
              Registra
            </Button>
          </ItemGrid>
        </Grid>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signupRequested: ({
      username,
      password,
      confirmPassword,
      firstName,
      lastName
    }) =>
      dispatch(
        signupRequested({
          username,
          password,
          confirmPassword,
          firstName,
          lastName
        })
      )
  };
};

export default reduxForm({
  form: "signupForm"
})(connect(null, mapDispatchToProps)(SignUp));
