import React, { Component } from "react";
import Button from './../../components/CustomButtons';
import { reduxForm, Field } from 'redux-form';
import { FormControlLabel } from 'material-ui/Form';
import {
  Checkbox,
  TextField
} from 'redux-form-material-ui';
import { signinRequested } from './../../actions';
import { connect } from 'react-redux';
import { Grid } from "material-ui";
import { ItemGrid } from "components";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.signin = this.signin.bind(this);
  }

  signin(values) {
    console.log('submit', values);
    this.props.signinRequested(values);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.signin)}>
        <Grid container justify="space-between">
          <ItemGrid xs={12}>
            <Field name="username" component={TextField} autoFocus fullWidth label="Username" />
          </ItemGrid>
          <ItemGrid xs={12}>
            <Field name="password" component={TextField} type="password" fullWidth label="Password" />
          </ItemGrid>
          <ItemGrid xs={12} md={3}>
            <FormControlLabel control={<Field name="rememberMe" component={Checkbox} />} label="Ricordami" />
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

const mapDispatchToProps = dispatch => {
  return {
    signinRequested: ({ username, password, rememberMe }) => dispatch(signinRequested({ username, password, rememberMe }))
  };
};

export default reduxForm({
  form: 'signinForm'
})(connect(
  null,
  mapDispatchToProps
)(SignIn));
