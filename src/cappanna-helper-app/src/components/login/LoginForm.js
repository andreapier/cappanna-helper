import "./LoginForm.css";
import RaisedButton from "material-ui/RaisedButton";
import { Card } from "material-ui/Card";
import React, { Component } from "react";
import { TextField } from "redux-form-material-ui";
import { Field, reduxForm } from "redux-form";
import { loginRequested } from "./../../actions";
import { connect } from "react-redux";
import ActionInput from "material-ui/svg-icons/action/input";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(loginData) {
    this.props.loginRequested(loginData);
  }

  render() {
    return (
      <div>
        <Card className="LoginForm-form-container">
          <div className="LoginForm-header">Esegui il login</div>
          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <div>
              <Field
                name="username"
                component={TextField}
                floatingLabelText="Username"
                fullWidth={true}
              />
            </div>
            <div>
              <Field
                name="password"
                type="password"
                component={TextField}
                floatingLabelText="Password"
                fullWidth={true}
              />
            </div>
            <div
              className="LoginForm-alert"
              style={{
                display: this.props.errorMessage ? "block" : "none"
              }}
            >
              {this.props.errorMessage ? (
                <strong>Errore! {this.props.errorMessage}</strong>
              ) : (
                ""
              )}
            </div>
            <div style={{ marginTop: "20px" }}>
              <RaisedButton
                type="submit"
                label="Login"
                disabled={this.props.loading}
                fullWidth={true}
                icon={<ActionInput />}
              />
            </div>
          </form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.error,
    loading: state.api.loading
  };
};

const mapDispatchToProps = dispatch => {
  return { loginRequested: loginData => dispatch(loginRequested(loginData)) };
};

export default reduxForm({
  form: "login"
})(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
