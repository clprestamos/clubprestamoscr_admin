import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UserList from '../components/UserList';

const Users = props => (
  <div className="loans">
    <h1>Usuarios</h1>
    <div className="content">
      <UserList userList={props.users} />
    </div>
  </div>
);

const mapStateToProps = state => ({
  users: state.users.data,
});

export default withRouter(connect(mapStateToProps)(Users));
