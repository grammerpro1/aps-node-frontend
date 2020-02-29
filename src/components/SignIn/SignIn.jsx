import React, { Component } from "react";
import SignInForm from "./SignInForm";

class SignIn extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <SignInForm />
        </div>
      </div>
    );
  }
}

export default SignIn;
