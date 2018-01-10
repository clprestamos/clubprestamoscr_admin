import React, { Component } from 'react';
import autobind from 'react-autobind';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { Table, Image, Icon } from 'semantic-ui-react';

import * as MainActionCreators from '../actions/';
import * as LoansActions from '../actions/Loans';

class Loans extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators({
      MainActionCreators,
      LoansActions,
    }, dispatch);
    autobind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(LoansActions.getAllLoans());
  }
  handleLink(link) {
    const { dispatch } = this.props;
    dispatch(push(link));
  }
  render() {
    return (
      <div className="loans">
        <h1>Préstamos</h1>
        <div className="content">
          <Table striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Monto</Table.HeaderCell>
                <Table.HeaderCell>Plazo</Table.HeaderCell>
                <Table.HeaderCell>Fecha de Solicitud</Table.HeaderCell>
                <Table.HeaderCell>Estado</Table.HeaderCell>
                <Table.HeaderCell>View</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.loans.data.map((loan, index) => {
                const key = index + 1;
                return (
                  <Table.Row key={key}>
                    <Table.Cell>{loan.loanId}</Table.Cell>
                    <Table.Cell>
                      <Image src={loan.avatar ? loan.avatar : 'https://react.semantic-ui.com/assets/images/wireframe/square-image.png'} avatar />
                      <span>{loan.name} {loan.lastName}</span>
                    </Table.Cell>
                    <Table.Cell>₡ {loan.amount}</Table.Cell>
                    <Table.Cell>{loan.term}</Table.Cell>
                    <Table.Cell>{`${moment(new Date(loan.requestLoanDate)).format('DD-MM-YYYY')}`}</Table.Cell>
                    <Table.Cell>{loan.stateName}</Table.Cell>
                    <Table.Cell><Link to={`/dashboard/loans/${loan.loanId}`} onClick={() => this.handleLink(`/dashboard/loans/${loan.loanId}`)}><Icon name="eye" /></Link></Table.Cell>
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

const mapStateToProps = state => ({
  routing: state.routing.location,
  loans: state.loans,
});

export default withRouter(connect(mapStateToProps)(Loans));
