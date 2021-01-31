import * as actionTypes from './actionTypes';
import axios from '../../axios-default';

export const getPosts = (page = 1, postsPerPage = 20) => {
  return dispatch => {
    dispatch({ type: actionTypes.START_POST_LOADER });

    axios
      .get('/posts', {
        params: {
          page: parseInt(page),
          posts_per_page: parseInt(postsPerPage),
          include_pagination: true
        }
      })
      .then(res => {
        dispatch({
          type: actionTypes.STORE_POSTS,
          posts: res.data.content.posts
        });
        if (res.data.content.pagination) {
          dispatch({
            type: actionTypes.SET_PAGINATION,
            payload: res.data.content.pagination
          });
        }
        dispatch({ type: actionTypes.STOP_POST_LOADER });
      })
      .catch(err => {
        dispatch({ type: actionTypes.STOP_POST_LOADER });

        // with errorHandler
        dispatch(setPostError());

        // Without errorHandler
        // dispatch(setPostError(err.response.data));
      });
  };
};

// export const editPost = post => {
//   return dispatch => {
//     dispatch({ type: actionTypes.START_POST_LOADER });

//     axios
//       .patch(`/posts/${post.uuid}`, post)
//       .then(response => {
//         dispatch({ type: actionTypes.STOP_POST_LOADER });
//       })
//       .catch(error => {
//         dispatch({ type: actionTypes.STOP_POST_LOADER });
//       });
//   };
// };

// export const createPost = (post, props) => {
//   return dispatch => {
//     dispatch({ type: actionTypes.START_POST_LOADER });

//     axios
//       .post("/posts", post)
//       .then(response => {
//         dispatch({ type: actionTypes.STOP_POST_LOADER });
//         props.history.push("/posts");
//       })
//       .catch(error => {
//         dispatch({ type: actionTypes.STOP_POST_LOADER });
//       });
//   };
// };

export const setPostError = (error = {}) => {
  // With errorhandler
  return {
    type: actionTypes.SET_POST_ERROR,
    error: {
      error_code: error.status_code !== null ? error.status_code : '',
      error_msg: error.status_code !== null ? error.content : ''
    }
  };

  // without errorHandler
  // return { type: actionTypes.SET_POST_ERROR, error: {code: error.status_code, message: error.content }};
};
