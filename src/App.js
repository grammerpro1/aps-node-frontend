import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import "./App.css";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import FlashMessagesList from "./components/Flash/FlashMessagesList";
import { connect } from "react-redux";
import { logOut } from "../src/actions/login";
import requireAuth from "./utils/requireAuth";

function App({ auth, logOut }) {
  const { isAuth } = auth;

  const handleLogOut = () => {
    logOut();
  };

  const guestsLinks = (
    <div>
      <Link to="/signUp">Registrarse</Link>&nbsp;&nbsp;
      <Link to="/signIn">Conectarse</Link>
    </div>
  );

  const usersLink = (
    <div>
      <Link to="#" onClick={() => handleLogOut()}>
        Desconectarse
      </Link>
    </div>
  );

  return (
    <div>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          {/* <a className="navbar-brand" href="#"> */}
          APS
          {/* </a> */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active" />
            </ul>
            <span className="navbar-text">
              {isAuth ? usersLink : guestsLinks}
            </span>
          </div>
        </nav>
        <div className="container">
          <FlashMessagesList></FlashMessagesList>
          <Switch>
            <Route path="/signUp">
              <SignUp />
            </Route>
            <Route path="/signIn">
              <SignIn />
            </Route>
            <Route path="/transaction" component={requireAuth(Home)} />
            <Route path="/" component={requireAuth(Home)} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logOut })(App);
