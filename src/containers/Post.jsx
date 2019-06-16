import React, { useState, useEffect, useReducer } from "react";
import errorHandler from "../hoc/errorHandler";
import axios from "../axios-default";

import { postReducer } from "../hookReducers/reducers/post";
import { buildDate } from "../Utils";

import PostEdit from "../components/Post/PostEdit";
import PostView from "../components/Post/PostView";
import Loader from "../components/UI/Loader";

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

/**
 * Component for displaying posts in View / Edit / Create mode.
 * @todo Move editMode/createMode/viewMode to useReducer as well?
 */
const Post = props => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  const { post, saveDisabled, loading } = state;
  const [editMode, setEditMode] = useState(
    props.match.path === "/post/edit/:uuid" ? true : false
  );
  const [createMode] = useState(
    props.match.path === "/post/add" ? true : false
  );
  const [viewMode, setViewMode] = useState(
    props.match.path === "/post/:uuid" ? true : false
  );

  /**
   * Get post data from backend if it's not a add post view
   */
  useEffect(() => {
    if (!createMode) {
      dispatch({ type: "IS_LOADING" });

      axios
        .get("/posts/" + props.match.params.uuid)
        .then(res => {
          let new_post = post;

          if (Object.keys(res.data.content).length !== 0) {
            new_post = res.data.content[0];
          }

          dispatch({ type: "SET_POST", payload: new_post });
          dispatch({ type: "NOT_LOADING" });
          dispatch({
            type: "SET_SAVE_DISABLED",
            payload: !(
              new_post.title.trim() !== "" && new_post.content.trim() !== ""
            )
          });
        })
        .catch(err => {
          setTimeout(() => {
            props.history.push("/posts");
          }, 3000);
        });
    }
  }, []);

  useEffect(() => {
    setEditMode(props.match.path === "/post/edit/:uuid" ? true : false);
    setViewMode(props.match.path === "/post/:uuid" ? true : false);
  }, [props.match.path]);

  const handleTextChange = (event, inputElm) => {
    const updatedPost = { ...post };
    updatedPost[inputElm] = event.target.value;

    const formIsInvalid = !(
      updatedPost.title.trim() !== "" && updatedPost.content.trim() !== ""
    );

    dispatch({ type: "SET_POST", payload: updatedPost });
    dispatch({
      type: "SET_SAVE_DISABLED",
      payload: formIsInvalid
    });
  };

  const handleDateChange = newDate => {
    dispatch({
      type: "SET_POST",
      payload: {
        ...post,
        publish_date: newDate
      }
    });
  };

  const handleClickBack = () => {
    props.history.goBack();
  };

  const submitPostHandler = event => {
    event.preventDefault();
    dispatch({ type: "IS_LOADING" });

    const publishDateState =
      post.publish_date instanceof Date
        ? post.publish_date
        : new Date(post.publish_date);

    const date = buildDate(publishDateState);
    const new_post = { ...post, publish_date: date };

    if (editMode === true) {
      axios
        .patch(`/posts/${new_post.uuid}`, new_post)
        .then(response => {
          dispatch({ type: "NOT_LOADING" });
        })
        .catch(error => {
          dispatch({ type: "NOT_LOADING" });
        });
    } else {
      axios
        .post("/posts", new_post)
        .then(response => {
          dispatch({ type: "NOT_LOADING" });
          props.history.push("/posts");
        })
        .catch(error => {
          dispatch({ type: "NOT_LOADING" });
        });
    }
  };

  let postContent = "";

  if (loading) {
    postContent = <Loader />;
  } else if (viewMode) {
    postContent = <PostView post={post} onBackClick={handleClickBack} />;
  } else {
    postContent = (
      <PostEdit
        onChange={handleTextChange}
        onSubmit={submitPostHandler}
        onDateChange={handleDateChange}
        post={post}
        saveDisabled={saveDisabled}
      />
    );
  }

  return postContent;
};

export default errorHandler(Post, axios);
