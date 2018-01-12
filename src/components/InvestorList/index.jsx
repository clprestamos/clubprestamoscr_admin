import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { Table, Icon, Image } from 'semantic-ui-react';

import * as utils from '../../utils';

class InvestorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: [{
        userId: 0,
        avatar: '',
        name: '',
        lastName: '',
        identification: '',
        cellphone: 0,
        signupDate: '',
        loans: 0,
      }],
      direction: null,
    };
  }
  componentWillMount() {
    this.setState({
      data: this.props.investorList,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.investorList !== this.props.investorList) {
      this.setState({
        data: nextProps.investorList,
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
      <div className="table-list investor-list">
        <Table sortable striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell sorted={column === 'userId' ? direction : null} onClick={() => this.handleSort('userId')}>
                ID
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'name' ? direction : null} onClick={() => this.handleSort('name')}>
                Nombre
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'identification' ? direction : null} onClick={() => this.handleSort('identification')}>
                Cédula
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'cellphone' ? direction : null} onClick={() => this.handleSort('cellphone')}>
                Celular
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'signupDate' ? direction : null} onClick={() => this.handleSort('requestLoanDate')}>
                Ingreso
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'loans' ? direction : null} onClick={() => this.handleSort('loans')}>
                Préstamos
              </Table.HeaderCell>
              <Table.HeaderCell>
                View
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({
              userId,
              avatar,
              name,
              lastName,
              identification,
              cellphone,
              signupDate,
            }) => {
              const loans = _.filter(this.props.loansByInvestor, { investorId: userId });
              return (
                <Table.Row key={userId + 1}>
                  <Table.Cell>{userId}</Table.Cell>
                  <Table.Cell>
                    <Image src={!avatar ? 'https://react.semantic-ui.com/assets/images/wireframe/square-image.png' : avatar} avatar />
                    <span>{name} {lastName}</span>
                  </Table.Cell>
                  <Table.Cell>{identification}</Table.Cell>
                  <Table.Cell>{cellphone}</Table.Cell>
                  <Table.Cell>{utils.parseDate(signupDate)}</Table.Cell>
                  <Table.Cell>{loans.length}</Table.Cell>
                  <Table.Cell><Link to={`/dashboard/inversionistas/${userId}`} onClick={() => this.handleLink(`/dashboard/inversionistas/${userId}`)}><Icon name="eye" /></Link></Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

InvestorList.propTypes = {
  investorList: PropTypes.array.isRequired,
  loansByInvestor: PropTypes.array.isRequired,
};

export default connect()(InvestorList);
