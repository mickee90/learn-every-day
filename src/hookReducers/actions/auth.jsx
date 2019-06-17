import * as actionTypes from "./actionTypes";

export const disableSubmit = validity => {
  return {
    type: actionTypes.DISABLE_SUBMIT,
    payload: validity
  };
};

export const setField = field => {
  return {
    type: actionTypes.FIELD,
    payload: field
  };
};
