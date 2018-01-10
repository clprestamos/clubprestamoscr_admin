import React, { Component } from 'react';
import autobind from 'react-autobind';
import moment from 'moment';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { Table, Image, Icon } from 'semantic-ui-react';

import * as MainActionCreators from '../actions/';
import * as Investors from '../actions/Investors';
import * as LoansByInvestor from '../actions/LoansByInvestor';

class Inversionistas extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators({
      MainActionCreators,
      Investors,
      LoansByInvestor,
    }, dispatch);
    autobind(this);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(Investors.getAllInvestors());
    dispatch(LoansByInvestor.getLoansByInvestor());
  }
  handleLink(link) {
    const { dispatch } = this.props;
    dispatch(push(link));
  }
  render() {
    const { loansByInvestor } = this.props;
    return (
      <div className="investors">
        <h1>Inversionistas</h1>
        <div className="content">
          <Table striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Nombre</Table.HeaderCell>
                <Table.HeaderCell>Cédula</Table.HeaderCell>
                <Table.HeaderCell>Celular</Table.HeaderCell>
                <Table.HeaderCell>Ingreso</Table.HeaderCell>
                <Table.HeaderCell>Préstamos</Table.HeaderCell>
                <Table.HeaderCell>View</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.investors.data.map((investor, index) => {
                const key = index + 1;
                const loans = _.filter(loansByInvestor, { investorId: investor.userId });
                return (
                  <Table.Row key={key}>
                    <Table.Cell>{investor.userId}</Table.Cell>
                    <Table.Cell>
                      <Image src={investor.avatar ? investor.avatar : 'https://react.semantic-ui.com/assets/images/wireframe/square-image.png'} avatar />
                      <span>{investor.name} {investor.lastName}</span>
                    </Table.Cell>
                    <Table.Cell>{investor.identification}</Table.Cell>
                    <Table.Cell>{investor.cellphone}</Table.Cell>
                    <Table.Cell>{`${moment(new Date(investor.signupDate)).format('DD-MM-YYYY')}`}</Table.Cell>
                    <Table.Cell>{loans.length}</Table.Cell>
                    <Table.Cell><Link to={`/dashboard/inversionistas/${investor.userId}`} onClick={() => this.handleLink(`/dashboard/inversionistas/${investor.userId}`)}><Icon name="eye" /></Link></Table.Cell>
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
  investors: state.investors,
  loansByInvestor: state.loansByInvestor.data,
});

export default withRouter(connect(mapStateToProps)(Inversionistas));
