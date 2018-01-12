import React, { Component } from 'react';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import * as MainActionCreators from '../actions/';
import * as Investors from '../actions/Investors';
import * as LoansByInvestor from '../actions/LoansByInvestor';

import InvestorList from '../components/InvestorList';

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
          <InvestorList investorList={this.props.investors.data} loansByInvestor={loansByInvestor} />
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
