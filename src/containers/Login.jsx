import React, { useEffect, useReducer } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

// import GlobalContext from "../context/global-context";
import { authReducer } from "../hookReducers/reducers/auth";
import errorHandler from "../hoc/errorHandler";
import * as actions from "../reduxStore/actions/index";
import axios from "../axios-default";

import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Logo from "../components/UI/Logo";

import styled from "styled-components";

const initialState = {
  username: "",
  password: "",
  errorMessage: "",
  submitDisabled: true
};

/**
 * @todo Continue replacing Redux with Context?
 */
const Login = props => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { username, password, errorMessage, submitDisabled } = state;

  useEffect(() => {
    setTimeout(() => {
      props.onResetError();
    }, 3000);
  }, [props.error]);

  useEffect(() => {
    if (username !== "" && password !== "") {
      dispatch({ type: "DISABLE_SUBMIT", payload: false });
    } else {
      dispatch({ type: "DISABLE_SUBMIT", payload: true });
    }
  }, [username, password]);

  const handleSubmit = event => {
    event.preventDefault();
    props.onLogin(username, password);
  };

  const handleTextChange = (event, inputElm) => {
    event.preventDefault();
    dispatch({
      type: "FIELD",
      payload: { fieldName: inputElm, value: event.target.value }
    });
  };

  return (
    <div style={{ padding: "30px 20px" }}>
      <Slogan>
        <Logo />
      </Slogan>

      {errorMessage}
      <form onSubmit={handleSubmit} autoComplete="off" className="clearFix">
        <Input
          changed={event => handleTextChange(event, "username")}
          type="email"
          name="username"
          placeholder="Username"
          value={username}
          required={true}
        />
        <Input
          changed={event => handleTextChange(event, "password")}
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          required={true}
        />

        <Button
          name="submit"
          type="submit"
          label="Login"
          classes="LoginBtn"
          disabled={submitDisabled}
        />
      </form>
      <NavLink
        to="/account/create"
        className="textLink"
        style={{ marginTop: "10px", float: "right", color: "rgba(0,0,0,0.6)" }}
      >
        Create Account
      </NavLink>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    error: state.auth.error,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogin: (username, password) =>
      dispatch(actions.auth(username, password, ownProps)),
    onResetError: () => dispatch(actions.resetError())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(errorHandler(Login, axios))
);

const Slogan = styled.div`
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.4em;
`;
