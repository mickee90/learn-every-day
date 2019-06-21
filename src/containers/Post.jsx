import React, { useEffect, useReducer } from 'react';
import errorHandler from '../hoc/errorHandler';
import axios from '../axios-default';

import { postReducer } from '../hookReducers/reducers/post';
import * as reducerActions from '../hookReducers/actions/post';
import { buildDate } from '../utils/helpers';

import PostEdit from '../components/Post/PostEdit';
import PostView from '../components/Post/PostView';
import Loader from '../components/UI/Loader';

/**
 * Component for displaying a post in View / Edit / Create mode.
 */
const Post = props => {
  const initialState = {
    post: {
      uuid: null,
      user_id: null,
      title: '',
      publish_date: new Date(),
      content: ''
    },
    saveDisabled: true,
    loading: false,
    editMode: props.match.path === '/post/edit/:uuid' ? true : false,
    createMode: props.match.path === '/post/add' ? true : false,
    viewMode: props.match.path === '/post/:uuid' ? true : false
  };
  const [state, dispatch] = useReducer(postReducer, initialState);
  const { post, saveDisabled, loading, editMode, createMode, viewMode } = state;

  /**
   * Get post data from backend if it's not a add post view
   */
  useEffect(() => {
    if (!createMode) {
      dispatch(reducerActions.isLoading(true));

      axios
        .get('/posts/' + props.match.params.uuid)
        .then(res => {
          let new_post = post;

          if (Object.keys(res.data.content).length !== 0) {
            new_post = res.data.content[0];
          }

          dispatch(reducerActions.setPost(new_post));
          dispatch(reducerActions.isLoading(false));
          dispatch(
            reducerActions.setSaveDisabled(
              !(new_post.title.trim() !== '' && new_post.content.trim() !== '')
            )
          );
        })
        .catch(err => {
          setTimeout(() => {
            props.history.push('/posts');
          }, 3000);
        });
    }
  }, []);

  /**
   * Set View mode depending on URL
   */
  useEffect(() => {
    dispatch(
      reducerActions.setEditMode(
        props.match.path === '/post/edit/:uuid' ? true : false
      )
    );
    dispatch(
      reducerActions.setViewMode(
        props.match.path === '/post/:uuid' ? true : false
      )
    );
  }, [props.match.path]);

  /**
   * Validate inputs and set Post + saveDisabled state accordingly
   */
  const handleTextChange = (event, inputElm) => {
    const updatedPost = { ...post };
    updatedPost[inputElm] = event.target.value;

    const formIsInvalid = !(
      updatedPost.title.trim() !== '' && updatedPost.content.trim() !== ''
    );

    dispatch(reducerActions.setPost(updatedPost));
    dispatch(reducerActions.setSaveDisabled(formIsInvalid));
  };

  /**
   * Update Post state publish date
   */
  const handleDateChange = newDate => {
    dispatch(
      reducerActions.setPost({
        ...post,
        publish_date: newDate
      })
    );
  };

  /**
   * Create or update post depending on mode.
   * Build date with correct format before axios runs
   * Redirect to /posts if a new is created.
   */
  const submitPostHandler = event => {
    event.preventDefault();
    dispatch(reducerActions.isLoading(true));

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
          dispatch(reducerActions.isLoading(false));
        })
        .catch(error => {
          dispatch(reducerActions.isLoading(false));
        });
    } else {
      axios
        .post('/posts', new_post)
        .then(response => {
          dispatch(reducerActions.isLoading(false));
          props.history.push('/posts');
        })
        .catch(error => {
          dispatch(reducerActions.isLoading(false));
        });
    }
  };

  let postContent = '';

  if (loading) {
    postContent = <Loader />;
  } else if (viewMode) {
    postContent = <PostView post={post} onBackClick={props.history.goBack()} />;
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
