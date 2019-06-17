import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../reduxStore/actions/index";
import errorHandler from "../hoc/errorHandler";
import axios from "../axios-default";

import ListItem from "../components/List/ListItem";
import Loader from "../components/UI/Loader";

import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

/**
 * @todo Add pagination, search and filter. Extend Redux with this info
 * @todo Store current X posts in localStorage to prevent extra API fetches?
 */
const Posts = props => {
  useEffect(() => {
    props.onFetchPosts();
  }, []);

  let postContent = "";
  if (props.loading) {
    postContent = <Loader />;
  } else if (props.posts.length > 0) {
    postContent = props.posts.map(post => (
      <ListItem
        key={post.uuid}
        link={"/post/" + post.uuid}
        exact={true}
        title={post.title}
        date={post.publish_date}
      />
    ));
  }

  return (
    <PostsStyle>
      {postContent}
      <AddIconStyle color="primary">
        <NavLink to="/post/add">
          <AddIcon />
        </NavLink>
      </AddIconStyle>
    </PostsStyle>
  );
};

const mapStateToProps = state => {
  return {
    posts: state.post.posts,
    loading: state.post.loading,
    error: state.post.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPosts: () => dispatch(actions.getPosts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(errorHandler(Posts, axios));

const PostsStyle = styled.div`
  position: relative;
  height: calc(100vh - 50px);
  border-bottom: 1px solid #000;
`;

const AddIconStyle = styled(Fab)`
  && {
    position: absolute;
    bottom: 10px;
    right: 10px;
    line-height: inherit;
  }
`;
