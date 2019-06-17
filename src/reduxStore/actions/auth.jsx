import * as actionTypes from "./actionTypes";
import * as actions from "./index";
import axios from "../../axios-default";

const authStart = () => {
  return { type: actionTypes.AUTH_START };
};

const authSuccess = authData => {
  return { type: actionTypes.AUTH_SUCCESS, ...authData };
};

export const authFail = (error = {}) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error_code: error.status_code !== null ? error.status_code : "",
    error_msg: error.status_code !== null ? error.content : ""
  };
};

export const authCheckStatus = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    if (!token) {
      dispatch(logout());
    } else {
      if (new Date(getState().auth.expireTime) <= new Date()) {
        dispatch(logout());
      }
    }
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({ type: actionTypes.CLEAR_USER });
    dispatch({ type: actionTypes.CLEAR_POSTS });
    dispatch({ type: actionTypes.LOGOUT });
  };
};

export const resetError = () => {
  return { type: actionTypes.AUTH_RESET_ERROR };
};

// Use return dispatch to make it possible for async calls
export const auth = (username, password, ownProps) => {
  return dispatch => {
    dispatch(authStart());

    const userData = {
      username,
      password,
      returnToken: true,
      ignoreAuthCheck: true
    };

    axios
      .post("/auth", userData)
      .then(response => {
        if (response.data) {
          dispatch(actions.storeUser(response.data.content));
          dispatch(authSuccess(response.data.content));
          ownProps.history.push("/posts");
        }
      })
      .catch(error => {
        dispatch(authFail());
      });
  };
};
