import React, { Component } from "react";
import "./Home.scss";
import PaymentMethods from "./../PaymentMethods/PaymentMethods";
import TransactionData from "../TransactionData/TransactionData";
import { getMediosPagoUsuario, getMediosPagoComercio } from "./services";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idCliente: localStorage.getItem("userId"),
      pendienteTransaccion: false,
      paymentMethodsList: [],
      selectedPaymentMethod: {},
      allowedCommercePaymentMethods: [],
      transaction: {},
      reloadMediosPago: false
    };
  }

  componentDidMount() {
    const transaction = JSON.parse(localStorage.getItem("transaction"));

    if (transaction) {
      const { idComercio } = transaction;
      const { idCliente } = this.state;

      getMediosPagoComercio(idComercio).then(response => {
        getMediosPagoUsuario(idCliente).then(res => {
          this.setState({
            allowedCommercePaymentMethods: response.data.ListaMPComercio,
            paymentMethodsList: res.data.ListaMPUsuario,
            transaction
          });
        });
      });
    } else {
      this.setState({ pendienteTransaccion: true });
    }
  }

  setReloadMediosPago = () => {
    this.setState({ reloadMediosPago: true });
  };

  componentDidUpdate(prevState) {
    const { reloadMediosPago, idCliente } = this.state;
    const { reloadMediosPago: prevReloadMediosPago } = prevState;
    if (prevReloadMediosPago !== reloadMediosPago) {
      if (reloadMediosPago) {
        getMediosPagoUsuario(idCliente).then(res => {
          this.setState({
            paymentMethodsList: res.data.ListaMPUsuario,
            reloadMediosPago: false
          });
        });
      }
    }
  }

  setSelectedPaymentMethod = paymentMethod => {
    this.setState({ selectedPaymentMethod: paymentMethod });
  };

  setPendienteTransaccion = () => {
    localStorage.removeItem("transaction");
    this.setState({ pendienteTransaccion: true });
  };

  render() {
    const {
      pendienteTransaccion,
      paymentMethodsList,
      selectedPaymentMethod,
      allowedCommercePaymentMethods,
      idCliente,
      transaction: { idComercio, nombreComercio, monto, cuotas, idMoneda }
    } = this.state;

    return (
      <div>
        <div className="dashboard">
          {pendienteTransaccion
            ? "No hay transacciones pendientes"
            : [
                <PaymentMethods
                  key="1"
                  paymentMethodList={paymentMethodsList}
                  allowedCommercePaymentMethods={allowedCommercePaymentMethods}
                  setSelectedPaymentMethod={this.setSelectedPaymentMethod}
                  idCliente={idCliente}
                  setReloadMediosPago={this.setReloadMediosPago}
                />,
                <TransactionData
                  key="2"
                  {...selectedPaymentMethod}
                  idCliente={idCliente}
                  monto={monto}
                  idComercio={idComercio}
                  nombreComercio={nombreComercio}
                  cuotas={cuotas}
                  setPendienteTransaccion={this.setPendienteTransaccion}
                  idMoneda={idMoneda}
                />
              ]}
        </div>
      </div>
    );
  }
}

export default Home;
