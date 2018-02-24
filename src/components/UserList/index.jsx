import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { Table, Icon } from 'semantic-ui-react';

import * as utils from '../../utils';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: [{
        userId: 0,
        identification: '',
        name: '',
        lastName: '',
        email: '',
        signupDate: '',
        roleName: '',
      }],
    };
  }
  componentWillMount() {
    this.setState({
      data: this.props.userList,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userList !== this.props.userList) {
      this.setState({
        data: nextProps.userList,
      });
    }
  }
  handleSort(clickedColumn) {
    const { column, data, direction } = this.state;
    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      });
      return null;
    }
    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });
    return null;
  }
  handleLink(link) {
    const { dispatch } = this.props;
    dispatch(push(link));
  }
  render() {
    const { column, data, direction } = this.state;
    return (
      <div className="table-list client-list">
        <div className="content">
          <Table sortable striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell sorted={column === 'userId' ? direction : null} onClick={() => this.handleSort('userId')}>
                  ID
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'name' ? direction : null} onClick={() => this.handleSort('name')}>
                  Nombre
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'lastName' ? direction : null} onClick={() => this.handleSort('lastName')}>
                  Apellidos
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'email' ? direction : null} onClick={() => this.handleSort('email')}>
                  Email
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'identification' ? direction : null} onClick={() => this.handleSort('identification')}>
                  Identificación
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'signupDate' ? direction : null} onClick={() => this.handleSort('signupDate')}>
                  Fecha de ingreso
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'roleName' ? direction : null} onClick={() => this.handleSort('roleName')}>
                  Tipo de usuario
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Ver
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(data, ({
                userId,
                name,
                lastName,
                email,
                identification,
                roleName,
                signupDate,
              }) => (
                <Table.Row key={userId + 1}>
                  <Table.Cell>{userId}</Table.Cell>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{lastName}</Table.Cell>
                  <Table.Cell>{email}</Table.Cell>
                  <Table.Cell>{identification}</Table.Cell>
                  <Table.Cell>{utils.parseDate(signupDate)}</Table.Cell>
                  <Table.Cell>{roleName}</Table.Cell>
                  <Table.Cell><Link to={`/dashboard/usuarios/${userId}`} onClick={() => this.handleLink(`/dashboard/usuarios/${userId}`)}><Icon name="eye" /></Link></Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

UserList.propTypes = {
  userList: PropTypes.array.isRequired,
};

export default connect()(UserList);
