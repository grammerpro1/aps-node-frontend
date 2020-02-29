import isEmpty from "lodash/isEmpty";
import Validator from "validator";

export function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.nombreUsuario)) {
    errors.nombreUsuario = "This field is required.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "This field is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
