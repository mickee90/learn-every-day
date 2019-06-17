import { updateObject } from "../../Utils";

import * as actions from "../actions/actionTypes";

const initialState = {
  username: "",
  password: "",
  errorMessage: "",
  submitDisabled: true
};

const disableSubmit = (state, action) => {
  return updateObject(state, { submitDisabled: action.payload });
};

const updateField = (state, action) => {
  return updateObject(state, {
    [action.payload.fieldName]: action.payload.value
  });
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.DISABLE_SUBMIT:
      return disableSubmit(state, action);
    case actions.FIELD:
      return updateField(state, action);
    default:
      return state;
  }
};
