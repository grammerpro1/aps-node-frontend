import React, { Component } from "react";
import "./PaymentMethodListItem.scss";

class PaymentMethodListItem extends Component {
  handleClick = () => {
    const {
      IdTarjetaCliente,
      Proveedor,
      NumeroTarjeta,
      setSelectedPaymentMethod,
      Expiracion,
      IdTarjeta
    } = this.props;

    setSelectedPaymentMethod({
      IdTarjetaCliente,
      Proveedor,
      NumeroTarjeta,
      Expiracion,
      IdTarjeta
    });
  };

  render() {
    const { Proveedor, NumeroTarjeta } = this.props;

    return (
      <div
        className="payment-method-list-item"
        onClick={this.handleClick.bind()}
      >
        <div>{Proveedor}</div>
        <div>{NumeroTarjeta.substring(NumeroTarjeta.length - 4)}</div>
      </div>
    );
  }
}

export default PaymentMethodListItem;
