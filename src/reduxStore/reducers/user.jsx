import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../Utils";

const initialState = {
  uuid: "",
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  loading: false,
  error: ""
};

const storeUser = (state, action) => {
  return updateObject(state, { ...action.user });
};

const clearUser = (state, action) => {
  return updateObject(state, { ...initialState });
};

const updateUserStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const updateUserSuccess = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_USER:
      return storeUser(state, action);
    case actionTypes.CLEAR_USER:
      return clearUser(state, action);
    case actionTypes.UPDATE_USER_START:
      return updateUserStart(state, action);
    case actionTypes.UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
