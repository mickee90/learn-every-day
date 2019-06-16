import React from "react";
import { NavLink } from "react-router-dom";
import Moment from "react-moment";

import Aux from "../../hoc/Aux";

import styled from "styled-components";
import Fab from "@material-ui/core/Fab";
import Edit from "@material-ui/icons/Edit";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import KeyboardBackspace from "@material-ui/icons/KeyboardBackspace";

export default props => {
  return (
    <Aux>
      <Paper style={{ padding: "10px", boxShadow: "none" }}>
        <Typography variant="h5" component="h3">
          {props.post.title}
        </Typography>
        <Typography component="h6" style={{ marginTop: "5px" }}>
          <Moment format="YYYY-MM-DD">{props.post.publish_date}</Moment>
        </Typography>
        <Typography component="p" style={{ marginTop: "10px" }}>
          {props.post.content}
        </Typography>
      </Paper>
      <BackIcon color="primary" onClick={props.onBackClick}>
        <KeyboardBackspace />
      </BackIcon>
      <EditIcon color="primary">
        <NavLink
          to={`/post/edit/${props.post.uuid}`}
          style={{ lineHeight: "0px" }}
        >
          <Edit />
        </NavLink>
      </EditIcon>
    </Aux>
  );
};

const BackIcon = styled(Fab)`
  && {
    position: absolute;
    bottom: 10px;
    left: 10px;
    fontsize: 60px;
  }
`;

const EditIcon = styled(Fab)`
  && {
    position: absolute;
    bottom: 10px;
    right: 10px;
    fontsize: 60px;
  }
`;
