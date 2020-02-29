import React, { Component } from "react";
import "./AddPaymentMethod.scss";
import TextFieldGroup from "./../common/TextFieldGroup";
import isEmpty from "lodash/isEmpty";
import Validator from "validator";
import { postAltaTarjetaUsuario } from "./../Home/services";

class AddPaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      creditCardNumber: "",
      expiration: "",
      tipoTarjeta: 0,
      errors: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.creditCardNumber)) {
      errors.creditCardNumber = "El campo numero de tarjeta es obligatorio.";
    }

    if (Validator.isEmpty(data.expiration)) {
      errors.expiration = "El campo vencimiento es obligatorio.";
    }

    if (data.tipoTarjeta === 0) {
      errors.tipoTarjeta = "El campo tipo de tarjeta es obligatorio.";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }

  isValid() {
    const { errors, isValid } = this.validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      const { expiration, tipoTarjeta, creditCardNumber } = this.state;
      const { idCliente, setReloadMediosPago, onCloseForm } = this.props;

      let today = new Date();
      let dd = today.getDate();

      let mm = today.getMonth() + 1;
      let yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      today = `${yyyy}-${mm}-${dd}`;

      let tarjeta = {
        expiracion: expiration,
        fechaCreacion: today,
        idCliente,
        idTarjeta: tipoTarjeta.split("<separador>")[0],
        numeroTarjeta: creditCardNumber,
        proveedor: tipoTarjeta.split("<separador>")[1]
      };

      postAltaTarjetaUsuario(tarjeta).then(res => setReloadMediosPago());
      onCloseForm();
    }
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, creditCardNumber, expiration } = this.state;
    const { onCloseForm, allowedCommercePaymentMethods } = this.props;

    return (
      <div className="add-payment-method">
        <form onSubmit={this.onSubmit}>
          <TextFieldGroup
            field="creditCardNumber"
            label="Numero de Tarjeta"
            value={creditCardNumber}
            error={errors.creditCardNumber}
            onChange={this.onChange}
          />
          <div className="form-group">
            <label className="control-label">Tipo Tarjeta</label>
            <select
              className="form-control"
              name="tipoTarjeta"
              onChange={this.onChange}
            >
              <option value="0">Seleccione tipo de tarjeta</option>
              {allowedCommercePaymentMethods.map(paymentMethod => (
                <option
                  key={paymentMethod.IdTarjeta}
                  value={`${paymentMethod.IdTarjeta}<separador>${paymentMethod.NombreTarjeta}`}
                >
                  {paymentMethod.NombreTarjeta}
                </option>
              ))}
            </select>
            {errors.tipoTarjeta && (
              <span className="form-text text-danger">
                {errors.tipoTarjeta}
              </span>
            )}
          </div>
          <TextFieldGroup
            field="expiration"
            label="Vencimiento"
            value={expiration}
            error={errors.expiration}
            onChange={this.onChange}
          />
          <div className="form-group">
            <button className="btn btn-primary btn-lg">Guardar</button>
          </div>
        </form>
        <button className="btn btn-danger" onClick={onCloseForm}>
          Cancelar
        </button>
      </div>
    );
  }
}

export default AddPaymentMethod;
