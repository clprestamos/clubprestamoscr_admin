import React, { Component } from 'react';
import autobind from 'react-autobind';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import * as MainActionCreators from '../actions/';
import * as LoansActions from '../actions/Loans';

import LoanList from '../components/LoanList';

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
    const loans = [];
    _.forEach(this.props.loans.data, (loan) => {
      if (!_.find(loans, { loanId: loan.loanId })) {
        loans.push(loan);
      }
    });
    return (
      <div className="loans">
        <h1>Préstamos</h1>
        <div className="content">
          <LoanList loanList={loans} />
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
