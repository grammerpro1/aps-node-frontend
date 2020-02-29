import React, { Component } from "react";
import PropTypes from "prop-types";
import SignUpForm from "./SignUpForm";
import "./styles.css";
import { connect } from "react-redux";
import { userSignUpRequest } from "./../../api/SignUp/SignUp";
import { addFlashMessage } from "./../../actions/flashMessages";

class SignUp extends Component {
  render() {
    const { userSignUpRequest, addFlashMessage } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <SignUpForm
              userSignUpRequest={userSignUpRequest}
              addFlashMessage={addFlashMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

export default connect(null, { userSignUpRequest, addFlashMessage })(SignUp);
