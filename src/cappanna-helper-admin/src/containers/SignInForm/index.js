import React from "react";
import Button from './../../components/CustomButtons';
import { reduxForm, Field } from 'redux-form';
import { FormControlLabel } from 'material-ui/Form';
import {
  Checkbox,
  TextField
} from 'redux-form-material-ui';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form>
        <Field name="email" component={TextField} autoFocus fullWidth label="Email" />
        <Field name="password" component={TextField} type="password" fullWidth label="Password" />
        <FormControlLabel control={<Field name="rememberMe" component={Checkbox} />} label="Ricordami" />
        <Button>
          Sign in
        </Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'signinForm'
})(SignIn);
