import isEmpty from "lodash/isEmpty";
import Validator from "validator";

export function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.email)) {
    errors.email = "El campo email es requerido.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "El email es inválido.";
  }

  if (Validator.isEmpty(data.userName)) {
    errors.userName = "El campo nombre de usuario es requerido.";
  }

  if (Validator.isEmpty(data.pwd)) {
    errors.pwd = "El campo password es requerido.";
  }

  return { errors, isValid: isEmpty(errors) };
}
