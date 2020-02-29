import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addFlashMessage } from "./../actions/flashMessages";

import { withRouter } from "react-router-dom";

export default function(ComposedComponent) {
  class Authenticate extends Component {
    componentDidMount() {
      //http://localhost:3000/transaction?idComercio=1&monto=130.22&cuotas=12&idMoneda=1&nombreComercio=Rodwill
      if (this.props.location.pathname === "/transaction") {
        const queryString = new URLSearchParams(this.props.location.search);
        const transaction = {
          cuotas: queryString.get("cuotas"),
          monto: queryString.get("monto"),
          idComercio: queryString.get("idComercio"),
          idMoneda: queryString.get("idMoneda"),
          nombreComercio: queryString.get("nombreComercio")
        };

        localStorage.setItem("transaction", JSON.stringify(transaction));
        this.props.history.push("/");
      }

      if (!this.props.isAuth) {
        this.props.addFlashMessage({
          type: "error",
          text: "Inicia sesión para acceder"
        });
        this.props.history.push("/signIn");
      }
    }

    componentDidUpdate(nextProps) {
      if (!nextProps.isAuth) {
        this.props.history.push("/signIn");
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  Authenticate.propTypes = {
    isAuth: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  };

  const mapStateToProps = state => {
    return {
      isAuth: state.auth.isAuth
    };
  };

  return connect(mapStateToProps, {
    addFlashMessage
  })(withRouter(Authenticate));
}
