import React, { useEffect, useReducer } from 'react';
import * as actions from '../reduxStore/actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { userReducer } from '../hookReducers/reducers/user';
import * as reducerActions from '../hookReducers/actions/user';
import { validateFields } from '../utils/helpers';

import Aux from '../hoc/Aux';
import UserCreate from '../components/User/UserCreate';
import UserEdit from '../components/User/UserEdit';
import Loader from '../components/UI/Loader';

const User = props => {
  const initialState = {
    user: {
      uuid: props.user.uuid || '',
      password: '',
      password_2: '',
      first_name: props.user.first_name || '',
      last_name: props.user.last_name || '',
      username: props.user.username || '',
      email: props.user.email || ''
    },
    missingUser: false,
    editMode: props.match.path === '/account/update/:uuid',
    createMode: props.match.path === '/account/create',
    saveDisabled: true
  };
  const [reducerState, dispatch] = useReducer(userReducer, initialState);
  const {
    user,
    missingUser,
    editMode,
    createMode,
    saveDisabled
  } = reducerState;

  useEffect(() => {
    if (editMode) {
      dispatch(reducerActions.setSaveDisabled(validateEditForm(user)));
    }
  }, []);

  /**
   * @todo extend logic with a more dynamic way to validate fields
   */
  const handleTextChange = (event, inputElm) => {
    let formIsInvalid = false;
    const updatedUser = { ...user };

    updatedUser[inputElm] = event.target.value;

    if (createMode) {
      formIsInvalid = validateCreateForm(updatedUser);
    } else if (editMode) {
      formIsInvalid = validateEditForm(updatedUser);
    }

    dispatch(reducerActions.setUser(updatedUser));
    dispatch(reducerActions.setSaveDisabled(formIsInvalid));
  };

  const validateCreateForm = inputs => {
    const valid_fields = validateFields(inputs, [
      'username',
      'first_name',
      'last_name',
      'email',
      'password'
    ]);
    return !(
      valid_fields && inputs.password.trim() === inputs.password_2.trim()
    );
  };

  const validateEditForm = inputs => {
    return !validateFields(inputs, [
      'username',
      'first_name',
      'last_name',
      'email'
    ]);
  };

  const submitEditHandler = event => {
    event.preventDefault();
    props.onEditUser(user);
  };

  const submitCreateHandler = event => {
    event.preventDefault();
    props.onCreateUser(user);
  };

  let userContent = '';

  if (props.user.loading) {
    userContent = <Loader />;
  } else if (missingUser) {
    userContent = (
      <div style={{ padding: '10px' }}>No user was found with this ID</div>
    );
  } else if (editMode === true) {
    userContent = (
      <UserEdit
        {...user}
        saveDisabled={saveDisabled}
        onTextChange={handleTextChange}
        onEditClick={submitEditHandler}
      />
    );
  } else {
    userContent = (
      <UserCreate
        saveDisabled={saveDisabled}
        onTextChange={handleTextChange}
        onSaveClick={submitCreateHandler}
      />
    );
  }

  return <Aux> {userContent} </Aux>;
};

const mapStateToProps = state => {
  return {
    user: state.user,
    uuid: state.auth.uuid || '',
    isLoggedIn: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onEditUser: user => dispatch(actions.updateUser(user)),
    onCreateUser: user => dispatch(actions.createUser(user, ownProps)),
    onPopulateUser: userUuid => dispatch(actions.userPopulateProps(userUuid))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(User)
);
