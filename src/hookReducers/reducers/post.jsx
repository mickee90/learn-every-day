import { updateObject } from "../../Utils";

import * as actions from "../actions/post";

const initialState = {
  post: {
    uuid: null,
    user_id: null,
    title: "",
    publish_date: new Date(),
    content: ""
  },
  saveDisabled: true,
  loading: false
};

const setLoading = (state, value) => {
  return updateObject(state, { loading: value });
};

const setPost = (state, action) => {
  return updateObject(state, { post: action.payload });
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
    case actions.SET_POST:
      return setPost(state, action);
    case actions.SET_SAVE_DISABLED:
      return setSaveDisabled(state, action);
    default:
      return state;
  }
};
