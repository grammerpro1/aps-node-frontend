import React, { Component } from "react";
import "./TransactionData.scss";
import { isEmpty } from "lodash";
import TextFieldGroup from "../common/TextFieldGroup";
import validator from "validator";
import swal from "sweetalert";
import { postCompra } from "./../Home/services";

class TransactionData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledCVC: true,
      cvc: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  validateInput(data) {
    let errors = {};

    if (validator.isEmpty(data.cvc)) {
      errors.cvc = "El campo cvc es obligatorio.";
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

  componentDidUpdate(prevProps) {
    const { Proveedor } = this.props;
    const { Proveedor: prevProveedor } = prevProps;
    if (prevProveedor !== Proveedor) {
      this.setState({ disabledCVC: false });
    }
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  handleOnClick(e) {
    e.preventDefault();

    if (this.isValid()) {
      const {
        setPendienteTransaccion,
        monto,
        NumeroTarjeta,
        idComercio,
        Expiracion,
        cuotas,
        idMoneda,
        Proveedor,
        IdTarjeta,
        idCliente
      } = this.props;

      postCompra({
        cuotas,
        cvc: this.state.cvc,
        idCliente,
        idComercio,
        idMoneda,
        idSello: IdTarjeta,
        monto,
        pan: NumeroTarjeta,
        sello: Proveedor,
        vto: Expiracion
      }).then(res => {
        if (res.status === 200) {
          swal(
            "Éxito!",
            "La transacción se ha enviado correctamente!",
            "success"
          );
          setPendienteTransaccion();
        }
      });
    }
  }

  render() {
    const {
      monto,
      Proveedor,
      NumeroTarjeta,
      nombreComercio,
      cuotas
    } = this.props;

    const { cvc, errors, disabledCVC } = this.state;

    return (
      <div className="transaction-data">
        <div className="transaction-data__title">
          Compra en {nombreComercio}
        </div>
        <div className="transaction-data__info">
          <span className="transaction-data__info__field">Cantidad: </span>$
          {monto}
          <div className="transaction-data__info__field">
            Medio de pago seleccionado:
          </div>
          {Proveedor || "Ninguno"}
          <div>
            {NumeroTarjeta
              ? `Tarjeta ${NumeroTarjeta.substring(NumeroTarjeta.length - 4)}`
              : ""}
          </div>
          <span className="transaction-data__info__field">
            Cantidad de cuotas:{" "}
          </span>
          {cuotas}
        </div>
        <div className="container">
          <div className="col-8 offset-2">
            <TextFieldGroup
              field="cvc"
              label=""
              placeholder="Ingrese el CVC de su tarjeta aquí"
              value={cvc}
              error={errors.cvc}
              onChange={this.onChange}
              disabled={disabledCVC}
            />
            <button
              className="btn btn-primary btn-block"
              onClick={this.handleOnClick}
              disabled={disabledCVC}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default TransactionData;
