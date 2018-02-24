/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { Image, List, Icon, Form, Message, Dropdown, Input, Card } from 'semantic-ui-react';

import * as utils from '../utils';
import * as MainActionCreators from '../actions/';
import * as Loan from '../actions/Loan';
import * as InvestorByLoan from '../actions/InvestorByLoan';

import SaveModal from '../components/SaveModal';
import InvestorByLoanList from '../components/InvestorByLoanList';

class Prestamo extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators({
      MainActionCreators,
      Loan,
      InvestorByLoan,
    }, dispatch);
    this.state = {
      hasErrors: false,
      isSaveModalOpen: false,
      readOnly: true,
      company: false,
      interest: false,
      score: false,
    };
    autobind(this);
  }
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(Loan.getLoanData(match.params.id));
    dispatch(InvestorByLoan.getInvestorByLoan(match.params.id));
  }
  onChangeField(e) {
    const { dispatch } = this.props;
    const isValid = this.validation({ type: e.target.type, value: e.target.value });
    if (isValid) {
      this.setState({
        [e.target.name]: false,
        hasErrors: false,
      });
    } else {
      this.setState({
        [e.target.name]: true,
        hasErrors: true,
      });
    }
    if (e.target.type === 'date') {
      return dispatch(Loan.editLoanData({ field: e.target.name, value: new Date(e.target.value) }));
    }
    if (e.target.name === 'interest' || e.target.name === 'score') {
      if (e.target.value === '') {
        return dispatch(Loan.editLoanData({ field: e.target.name, value: 0 }));
      }
    }
    return dispatch(Loan.editLoanData({ field: e.target.name, value: e.target.value }));
  }
  onDropdownChange({ field, value }) {
    const { dispatch } = this.props;
    dispatch(Loan.editLoanData({ field, value }));
  }
  onToggleEdit() {
    this.setState({
      readOnly: !this.state.readOnly,
    });
  }
  onSubmitForm() {
    if (!this.state.hasErrors && !this.state.readOnly) {
      this.handleModalOpen();
    }
  }
  validation({ type, value }) {
    let result = false;
    if (utils.validateExp({ type, value })) result = true;
    if (value === '') result = false;
    return result;
  }
  handleLink(link) {
    const { dispatch } = this.props;
    dispatch(push(link));
  }
  handleModalOpen() {
    this.setState({
      isSaveModalOpen: !this.state.isSaveModalOpen,
      readOnly: true,
    });
  }
  saveChanges() {
    this.handleModalOpen();
    const { dispatch, match } = this.props;
    dispatch(Loan.saveLoan(match.params.id));
  }
  render() {
    const { data } = this.props.loan;
    const terms = utils.getTerms();
    const reasons = utils.getReasons();
    const amounts = utils.getAmounts();
    const states = utils.getStates();
    return (
      <div className="loan">
        <h1>Préstamo #{data.loanId}</h1>
        <div className="content">
          <div className="header">
            <div className="loan-info">
              <List horizontal>
                <List.Item>
                  <Image circular src={data.avatar ? data.avatar : 'https://react.semantic-ui.com/assets/images/wireframe/square-image.png'} size="tiny" />
                  <List.Content>
                    <List.Header>{`${data.name} ${data.lastName}`}</List.Header>
                    <List.Description>{data.identification}</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Fecha de solicitud</List.Header>
                    <List.Description>{utils.parseDate(data.requestLoanDate)}</List.Description>
                  </List.Content>
                </List.Item>
                { data.approvedDate ? (
                  <List.Item>
                    <List.Content>
                      <List.Header>Fecha de aprobación</List.Header>
                      <List.Description>{utils.parseDate(data.approvedDate)}</List.Description>
                    </List.Content>
                  </List.Item>
                ) : '' }
              </List>
            </div>
          </div>
          <Form onSubmit={this.onSubmitForm} success={this.props.loan.saveSuccess} error={this.props.loan.error}>
            <Form.Group>
              <Form.Field style={{ width: '33%' }}>
                <label>Monto:</label>
                { this.state.readOnly ? (
                  <input readOnly name="amount" type="text" value={`${utils.amountToMoney(data.amount)}`} />
                ) : (
                  <Dropdown
                    placeholder="Monto"
                    search
                    selection
                    fluid
                    compact
                    options={amounts}
                    onChange={(e, { value }) => {
                      this.onDropdownChange({ field: 'amount', value });
                    }}
                    defaultValue={data.amount}
                  />
                ) }
              </Form.Field>
              <Form.Field style={{ width: '33%' }}>
                <label>Plazo:</label>
                { this.state.readOnly ? (
                  <input readOnly name="term" type="text" value={data.term} />
                ) : (
                  <Dropdown
                    placeholder="Plazo"
                    search
                    selection
                    fluid
                    compact
                    options={terms}
                    onChange={(e, { value }) => {
                      this.onDropdownChange({ field: 'term', value });
                    }}
                    defaultValue={data.term}
                  />
                ) }
              </Form.Field>
              <Form.Field style={{ width: '33%' }}>
                <label>Razón:</label>
                { this.state.readOnly ? (
                  <input readOnly name="reason" type="text" value={data.reason} />
                ) : (
                  <Dropdown
                    placeholder="Razón"
                    search
                    selection
                    fluid
                    compact
                    options={reasons}
                    onChange={(e, { value }) => {
                      this.onDropdownChange({ field: 'reason', value });
                    }}
                    defaultValue={data.reason}
                  />
                ) }
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Input width={6} readOnly={this.state.readOnly} label="Compañía:" onChange={this.onChangeField} name="company" type="text" value={!data.company ? '' : data.company} error={this.state.company} />
              <Form.Field className="required">
                <label>Interés:</label>
                <Input
                  readOnly={this.state.readOnly}
                  name="interest"
                  type="number"
                  value={!data.interest ? 0 : data.interest}
                  required
                  error={this.state.interest}
                  onChange={this.onChangeField}
                  label={{ basic: true, content: '%' }}
                  labelPosition="right"
                />
              </Form.Field>
              <Form.Field className="required">
                <label>Score:</label>
                <Input
                  readOnly={this.state.readOnly}
                  name="score"
                  type="number"
                  value={!data.score ? 0 : data.score}
                  required
                  error={this.state.score}
                  onChange={this.onChangeField}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field style={{ width: '33%' }}>
                <label>Estado:</label>
                { this.state.readOnly ? (
                  <input readOnly name="stateName" type="text" value={data.stateName} />
                ) : (
                  <Dropdown
                    placeholder="Estado:"
                    search
                    selection
                    fluid
                    compact
                    options={states}
                    onChange={(e, { value }) => {
                      this.onDropdownChange({ field: 'stateId', value });
                    }}
                    defaultValue={data.stateId}
                  />
                ) }
              </Form.Field>
              <Form.Field className="signup-date">
                <label>Fecha de solicitud:</label>
                <input name="requestLoanDate" type="date" readOnly={this.state.readOnly} onChange={this.onChangeField} value={utils.parseDate(data.requestLoanDate)} required />
              </Form.Field>
              { data.approvedDate ? (
                <Form.Field className="signup-date">
                  <label>Fecha de aprobación:</label>
                  <input name="approvedDate" type="date" readOnly={this.state.readOnly} onChange={this.onChangeField} value={utils.parseDate(data.approvedDate)} required />
                </Form.Field>
              ) : '' }
            </Form.Group>
            <Message
              success
              header="Cambios Guardados"
              content="Los cambios fueron guardados"
            />
            <Message
              error
              header="Error"
              content={`Ocurrió un error. ${this.props.loan.error}`}
            />
            <Form.Field style={{ paddingBottom: '2rem', width: '100%' }}>
              <button style={{ float: 'left' }} type="button" className="btn edit" onClick={this.onToggleEdit}><Icon name="pencil" /> Editar</button>
              <button onClick={this.handleModalOpen} style={{ float: 'right' }} type="submit" className="btn save">Guardar cambios</button>
            </Form.Field>
          </Form>
        </div>
        <SaveModal isOpen={this.state.isSaveModalOpen} handleCancel={this.handleModalOpen} handleSave={this.saveChanges} />
        <Card>
          <Card.Content>
            <Card.Header>
              Inversionistas
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <InvestorByLoanList investorList={this.props.investorByLoan.data} />
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing.location,
  loan: state.loan,
  investorByLoan: state.investorByLoan,
});

export default withRouter(connect(mapStateToProps)(Prestamo));
