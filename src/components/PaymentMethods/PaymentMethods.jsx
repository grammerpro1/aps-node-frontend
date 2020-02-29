import React, { Component } from "react";
import "./PaymentMethods.scss";
import PaymentMethodListItem from "../PaymentMethodListItem/PaymentMethodListItem";
import AddPaymentMethod from "../AddPaymentMethod/AddPaymentMethod";
import { isEmpty, includes } from "lodash";

class PaymentMethods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      commerceCreditCardIdOnly: []
    };
  }

  handleAddForm = () => {
    this.setState({ showForm: true });
  };

  closeForm = () => {
    this.setState({ showForm: false });
  };

  componentDidUpdate(prevProps) {
    const { allowedCommercePaymentMethods } = this.props;
    const {
      allowedCommercePaymentMethods: prevAllowedCommercePaymentMethods
    } = prevProps;
    if (prevAllowedCommercePaymentMethods !== allowedCommercePaymentMethods) {
      if (!isEmpty(allowedCommercePaymentMethods)) {
        this.setState({
          commerceCreditCardIdOnly: allowedCommercePaymentMethods.map(val => {
            return val.IdTarjeta;
          })
        });
      }
    }
  }

  render() {
    const {
      paymentMethodList,
      setSelectedPaymentMethod,
      allowedCommercePaymentMethods,
      idCliente,
      setReloadMediosPago
    } = this.props;
    const { showForm, commerceCreditCardIdOnly } = this.state;

    return (
      <div>
        <div className="payment-methods">
          <div className="payment-methods__add">
            {!showForm ? (
              <button
                className="btn btn-primary"
                onClick={this.handleAddForm.bind(this)}
              >
                Añadir medio de pago
              </button>
            ) : (
              <AddPaymentMethod
                onCloseForm={this.closeForm}
                idCliente={idCliente}
                allowedCommercePaymentMethods={allowedCommercePaymentMethods}
                setReloadMediosPago={setReloadMediosPago}
              />
            )}
          </div>
          {!isEmpty(commerceCreditCardIdOnly) &&
            paymentMethodList.map(paymentMethod => {
              if (includes(commerceCreditCardIdOnly, paymentMethod.IdTarjeta)) {
                return (
                  <PaymentMethodListItem
                    key={paymentMethod.IdTarjetaCliente}
                    setSelectedPaymentMethod={setSelectedPaymentMethod}
                    {...paymentMethod}
                  />
                );
              }
              return "";
            })}
        </div>
      </div>
    );
  }
}

export default PaymentMethods;
