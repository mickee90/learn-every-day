import { updateObject } from "../../utils/helpers";

import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: {
    uuid: "",
    password: "",
    password_2: "",
    first_name: "",
    last_name: "",
    username: "",
    email: ""
  },
  missingUser: false,
  editMode: false,
  createMode: true,
  saveDisabled: true
};

const setUser = (state, action) => {
  return updateObject(state, { user: action.payload });
};

const setSaveDisabled = (state, action) => {
  return updateObject(state, { saveDisabled: action.payload });
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return setUser(state, action);
    case actionTypes.SET_USER_SAVE_DISABLED:
      return setSaveDisabled(state, action);
    default:
      return state;
  }
};
