import { updateObject } from "../../utils/helpers";

import * as actions from "../actions/actionTypes";

const initialState = {
  post: {
    uuid: null,
    user_id: null,
    title: "",
    publish_date: new Date(),
    content: ""
  },
  saveDisabled: true,
  loading: false,
  editMode: false,
  createMode: false,
  viewMode: true
};

const setLoading = (state, value) => {
  return updateObject(state, { loading: value });
};

const setPost = (state, action) => {
  return updateObject(state, { post: action.payload });
};

const setEditMode = (state, action) => {
  return updateObject(state, { editMode: action.payload });
};

const setViewMode = (state, action) => {
  return updateObject(state, { viewMode: action.payload });
};

const setSaveDisabled = (state, action) => {
  return updateObject(state, { saveDisabled: action.payload });
};

export const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.IS_LOADING:
      return setLoading(state, true);
    case actions.NOT_LOADING:
      return setLoading(state, false);
    case actions.LOADING:
      return setLoading(state, action.payload);
    case actions.SET_POST:
      return setPost(state, action);
    case actions.SET_POST_EDIT_MODE:
      return setEditMode(state, action);
    case actions.SET_POST_VIEW_MODE:
      return setViewMode(state, action);
    case actions.SET_POST_SAVE_DISABLED:
      return setSaveDisabled(state, action);
    default:
      return state;
  }
};
