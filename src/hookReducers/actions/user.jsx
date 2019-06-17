import * as actionTypes from "./actionTypes";

export const setSaveDisabled = validity => {
  return {
    type: actionTypes.SET_USER_SAVE_DISABLED,
    payload: validity
  };
};

export const setUser = user => {
  return { type: "SET_USER", payload: user };
};
