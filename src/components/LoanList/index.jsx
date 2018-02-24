import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { Table, Icon } from 'semantic-ui-react';

import * as utils from '../../utils';

class LoanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: [{
        id: 0,
        amount: '',
        term: '',
        reason: '',
        stateId: 0,
        requestLoanDate: '',
        userId: 0,
        interest: 0,
        score: 0,
        approvedDate: '',
        stateName: '',
        investorPercentage: 0,
      }],
      direction: null,
    };
  }
  componentWillMount() {
    this.setState({
      data: this.props.loanList,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.loanList !== this.props.loanList) {
      this.setState({
        data: nextProps.loanList,
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
      <div className="table-list loan-list">
        <div className="content">
          <Table sortable fixed striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell sorted={column === 'loanId' ? direction : null} onClick={() => this.handleSort('loanId')}>
                  ID
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'amount' ? direction : null} onClick={() => this.handleSort('amount')}>
                  Monto
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'term' ? direction : null} onClick={() => this.handleSort('term')}>
                  Plazo
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'reason' ? direction : null} onClick={() => this.handleSort('reason')}>
                  Razón
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'stateName' ? direction : null} onClick={() => this.handleSort('stateName')}>
                  Estado
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'requestLoanDate' ? direction : null} onClick={() => this.handleSort('requestLoanDate')}>
                  Fecha Solicitud
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'interest' ? direction : null} onClick={() => this.handleSort('interest')}>
                  Interés
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'score' ? direction : null} onClick={() => this.handleSort('score')}>
                  Score
                </Table.HeaderCell>
                <Table.HeaderCell sorted={column === 'investPercentage' ? direction : null} onClick={() => this.handleSort('investPercentage')}>
                  Inversión %
                </Table.HeaderCell>
                <Table.HeaderCell>
                  Monto Invertido
                </Table.HeaderCell>
                <Table.HeaderCell>
                  View
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(data, ({
                loanId,
                amount,
                term,
                reason,
                stateName,
                requestLoanDate,
                interest,
                score,
                investPercentage,
                investorPercentage,
                percentages,
              }) => {
                let investPtg = !investorPercentage ? investPercentage : investorPercentage;
                const percentageSum = _.sum(percentages);
                investPtg = !percentageSum ? investPtg : percentageSum;
                return (
                  <Table.Row key={loanId + 1}>
                    <Table.Cell>{loanId}</Table.Cell>
                    <Table.Cell>{`${utils.amountToMoney(amount)}`}</Table.Cell>
                    <Table.Cell>{term}</Table.Cell>
                    <Table.Cell>{reason}</Table.Cell>
                    <Table.Cell>{stateName}</Table.Cell>
                    <Table.Cell>{utils.parseDate(requestLoanDate)}</Table.Cell>
                    <Table.Cell>{!interest ? 'No ingresado' : `${interest}%`}</Table.Cell>
                    <Table.Cell>{!score ? 'No ingresado' : score}</Table.Cell>
                    <Table.Cell>{!investPtg ? 0 : investPtg}%</Table.Cell>
                    <Table.Cell>{!investPtg ? 0 : utils.amountToMoney((amount * investPtg) / 100)}</Table.Cell>
                    <Table.Cell><Link to={`/dashboard/prestamos/${loanId}`} onClick={() => this.handleLink(`/dashboard/prestamos/${loanId}`)}><Icon name="eye" /></Link></Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

LoanList.propTypes = {
  loanList: PropTypes.array.isRequired,
};

export default connect()(LoanList);
