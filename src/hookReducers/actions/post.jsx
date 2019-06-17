import * as actionTypes from "./actionTypes";

export const isLoading = validity => {
  return { type: actionTypes.LOADING, payload: validity };
};

export const setPost = post => {
  return { type: actionTypes.SET_POST, payload: post };
};

export const setSaveDisabled = validity => {
  return {
    type: actionTypes.SET_POST_SAVE_DISABLED,
    payload: validity
  };
};

export const setEditMode = validity => {
  return {
    type: actionTypes.SET_POST_EDIT_MODE,
    payload: validity
  };
};

export const setViewMode = validity => {
  return {
    type: actionTypes.SET_POST_VIEW_MODE,
    payload: validity
  };
};
