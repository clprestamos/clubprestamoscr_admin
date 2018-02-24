import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import PropTypes from 'prop-types';

import { Table, Icon, Image, Message } from 'semantic-ui-react';

import * as utils from '../../utils';

class InvestorByLoanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: [{
        investorId: 0,
        avatar: '',
        name: '',
        lastName: '',
        identification: '',
        percentage: 0,
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
    const investorList = (
      <Table sortable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={column === 'investorId' ? direction : null} onClick={() => this.handleSort('investorId')}>
              ID
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'name' ? direction : null} onClick={() => this.handleSort('name')}>
              Nombre
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'identification' ? direction : null} onClick={() => this.handleSort('identification')}>
              Cédula
            </Table.HeaderCell>
            <Table.HeaderCell sorted={column === 'cellphone' ? direction : null} onClick={() => this.handleSort('cellphone')}>
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
            investorId,
            avatar,
            name,
            lastName,
            identification,
            percentage,
            amount,
          }) => (
            <Table.Row key={investorId + 1}>
              <Table.Cell>{investorId}</Table.Cell>
              <Table.Cell>
                <Image src={!avatar ? 'https://react.semantic-ui.com/assets/images/wireframe/square-image.png' : avatar} avatar />
                <span>{name} {lastName}</span>
              </Table.Cell>
              <Table.Cell>{identification}</Table.Cell>
              <Table.Cell>{percentage}%</Table.Cell>
              <Table.Cell>{utils.amountToMoney((amount * percentage) / 100)}</Table.Cell>
              <Table.Cell><Link to={`/dashboard/inversionistas/${investorId}`} onClick={() => this.handleLink(`/dashboard/inversionistas/${investorId}`)}><Icon name="eye" /></Link></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
    const noInvestors = (
      <Message
        info
        icon="warning"
        header="No posee inversionistas"
        content="Si el cliente ya posee el score crediticio y el interés asignado cambie el estado a &ldquo;En espera&rdquo; para que aparezca en la lista de oportunidades."
      />
    );
    return (
      <div className="table-list investor-list">
        { this.props.investorList.length ? investorList : noInvestors }
      </div>
    );
  }
}

InvestorByLoanList.propTypes = {
  investorList: PropTypes.array.isRequired,
};

export default connect()(InvestorByLoanList);
