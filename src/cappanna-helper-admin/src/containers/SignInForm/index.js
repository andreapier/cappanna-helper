import React from "react";
import Button from './../../components/CustomButtons';
import { reduxForm, Field } from 'redux-form';
import { FormControlLabel } from 'material-ui/Form';
import {
  Checkbox,
  TextField
} from 'redux-form-material-ui';
import { signinRequested } from './../../actions';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.signin = this.signin.bind(this);
  }

  signin() {
    this.props.signinRequested({
      username: this.props.username,
      password: this.props.password,
      rememberMe: this.props.rememberMe
    });
  }

  render() {
    return (
      <form>
        <Field name="email" component={TextField} autoFocus fullWidth label="Email" />
        <Field name="password" component={TextField} type="password" fullWidth label="Password" />
        <FormControlLabel control={<Field name="rememberMe" component={Checkbox} />} label="Ricordami" />
        <Button onClick={this.signin}>
          Sign in
        </Button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signinRequested: ({username, password, rememberMe}) => dispatch(signinRequested({username, password, rememberMe}))
  };
};

export default reduxForm({
  form: 'signinForm'
})(SignIn);
