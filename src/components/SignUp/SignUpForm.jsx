import React, { Component } from "react";
import PropTypes from "prop-types";
import { validateInput } from "./shared/validators";
import TextFieldGroup from "../common/TextFieldGroup";
import { withRouter } from "react-router-dom";
import { postAltaUsuario } from "./../Home/services";

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      email: "",
      pwd: "",
      errors: {},
      nombre: "",
      apellido: "",
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
      const { history, addFlashMessage } = this.props;
      const { email, userName, apellido, nombre, pwd } = this.state;

      postAltaUsuario({
        email,
        nombreUsuario: userName,
        primerApellido: apellido,
        primerNombre: nombre,
        password: pwd
      }).then(response => {
        if (response.status === 200) {
          addFlashMessage({
            type: "success",
            text: "Registrado, bienvenido!"
          });
          history.push("/signIn");
        }
      });
    }
  }

  render() {
    const { errors } = this.state;
    const { userName, pwd, email, nombre, apellido } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <h1>¡Regístrate a APS!</h1>
          <TextFieldGroup
            type="text"
            label="Nombre de usuario"
            field="userName"
            className="form-control"
            value={userName}
            error={errors.userName}
            onChange={this.onChange}
          />

          <TextFieldGroup
            type="text"
            label="Nombre"
            field="nombre"
            className="form-control"
            value={nombre}
            error={errors.nombre}
            onChange={this.onChange}
          />

          <TextFieldGroup
            type="text"
            label="Apellido"
            field="apellido"
            className="form-control"
            value={apellido}
            error={errors.apellido}
            onChange={this.onChange}
          />

          <TextFieldGroup
            type="text"
            label="Dirección de e-mail"
            field="email"
            className="form-control"
            value={email}
            error={errors.email}
            onChange={this.onChange}
          />

          <TextFieldGroup
            type="password"
            label="Password"
            field="pwd"
            className="form-control"
            value={pwd}
            error={errors.pwd}
            onChange={this.onChange}
          />

          <div className="form-group">
            <button
              disabled={this.state.isLoading}
              className="btn btn-primary btn-lg"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SignUpForm.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

export default withRouter(SignUpForm);
