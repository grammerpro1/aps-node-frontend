import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";
import { validateInput } from "./SignInValidator";
import { connect } from "react-redux";
import { login } from "../../actions/login";
import { withRouter } from "react-router-dom";

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreUsuario: "",
      password: "",
      errors: {},
      isLoading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });

      this.props.login(this.state).then(
        res => this.props.history.push("/"),
        err => {
          this.setState({
            errors: err.response.data.data.errors,
            isLoading: false
          });
        }
      );
    }
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, nombreUsuario, password, isLoading } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {errors.form && (
            <div className="alert alert-danger">{errors.form}</div>
          )}
          <h1>Iniciar sesión</h1>
          <TextFieldGroup
            field="nombreUsuario"
            label="Nombre de usuario"
            value={nombreUsuario}
            error={errors.nombreUsuario}
            onChange={this.onChange}
          />
          <TextFieldGroup
            field="password"
            label="Password"
            value={password}
            error={errors.password}
            onChange={this.onChange}
            type="password"
          />
          <div className="form-group">
            <button className="btn btn-primary btn-lg" disabled={isLoading}>
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SignInForm.propTypes = {
  login: PropTypes.func.isRequired
};

export default withRouter(connect(null, { login })(SignInForm));
