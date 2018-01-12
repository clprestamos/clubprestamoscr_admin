/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { Image, List, Header, Icon, Form, Message, Card } from 'semantic-ui-react';

import * as utils from '../utils';
import * as MainActionCreators from '../actions/';
import * as Investor from '../actions/Investor';
import * as MyInvests from '../actions/MyInvests';

import SaveModal from '../components/SaveModal';
import LoanList from '../components/LoanList';

class Inversionista extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators({
      MainActionCreators,
      Investor,
      MyInvests,
    }, dispatch);
    this.state = {
      hasErrors: false,
      name: false,
      lastName: false,
      email: false,
      identification: false,
      cellphone: false,
      phone: false,
      readOnly: true,
      isSaveModalOpen: false,
      bank: false,
      clientAccount: false,
      iban: false,
    };
    autobind(this);
  }
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(Investor.getInvestorInfo(match.params.id));
    dispatch(MyInvests.getMyInvests(match.params.id));
  }
  onChangeField(e) {
    let isValid = true;
    if (e.target.name === 'identification') {
      isValid = this.validation({ type: 'identification', value: e.target.value });
    } else {
      isValid = this.validation({ type: e.target.type, value: e.target.value });
    }
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
    const { dispatch } = this.props;
    dispatch(Investor.editInvestorProfile({ field: e.target.name, value: e.target.value }));
  }
  onToggleChange() {
    if (!this.state.readOnly) {
      const { dispatch } = this.props;
      dispatch(Investor.editInvestorProfile({ field: 'isActive', value: !this.props.investor.data.isActive }));
    }
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
    dispatch(Investor.saveInvestorInfo(match.params.id));
  }
  render() {
    const { data } = this.props.investor;
    return (
      <div className="investor">
        <h1>Inversionista</h1>
        <div className="content">
          <div className="header">
            <div className="user-info">
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
                    <List.Header>Fecha de ingreso</List.Header>
                    <List.Description>{utils.parseDate(data.signupDate)}</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <List.Header>Préstamos</List.Header>
                    <List.Description>{this.props.myinvests.length}</List.Description>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <Header as="h5" icon onClick={this.onToggleChange}>
                      {data.isActive ? 'Activo' : 'Inactivo'}
                      <Icon name={`toggle ${data.isActive ? 'on' : 'off'}`} />
                    </Header>
                  </List.Content>
                </List.Item>
              </List>
            </div>
          </div>
          <Form onSubmit={this.onSubmitForm} success={this.props.investor.saveSuccess} error={this.props.investor.error}>
            <Form.Group>
              <Form.Input width={6} readOnly={this.state.readOnly} label="Nombre:" onChange={this.onChangeField} name="name" type="text" value={data.name} required error={this.state.name} />
              <Form.Input width={6} readOnly={this.state.readOnly} label="Apellidos:" onChange={this.onChangeField} name="lastName" type="text" value={data.lastName} required error={this.state.lastName} />
              <Form.Input width={6} readOnly={this.state.readOnly} label="Email:" onChange={this.onChangeField} name="email" type="email" value={data.email} required error={this.state.email} />
            </Form.Group>
            <Form.Group>
              <Form.Input width={6} readOnly={this.state.readOnly} label="Cédula:" onChange={this.onChangeField} name="identification" type="text" value={data.identification} required error={this.state.identification} />
              <Form.Input width={6} readOnly={this.state.readOnly} label="Celular:" onChange={this.onChangeField} name="cellphone" type="tel" value={data.cellphone} required error={this.state.cellphone} />
              <Form.Input width={6} readOnly={this.state.readOnly} label="Teléfono:" onChange={this.onChangeField} name="phone" type="tel" value={data.phone} required error={this.state.phone} />
            </Form.Group>
            <Form.Group>
              <Form.Input width={6} readOnly={this.state.readOnly} label="Banco:" onChange={this.onChangeField} name="bank" type="text" value={!data.bank ? '' : data.bank} required error={this.state.bank} />
              <Form.Input width={6} readOnly={this.state.readOnly} label="Cuenta Cliente:" onChange={this.onChangeField} name="clientAccount" type="text" value={!data.clientAccount ? '' : data.clientAccount} required error={this.state.clientAccount} />
              <Form.Input width={6} readOnly={this.state.readOnly} label="IBAN:" onChange={this.onChangeField} name="iban" type="text" value={!data.iban ? '' : data.iban} required error={this.state.iban} />
            </Form.Group>
            <Message
              success
              header="Cambios Guardados"
              content="Los cambios fueron guardados"
            />
            <Message
              error
              header="Error"
              content={`Ocurrió un error. ${this.props.investor.error}`}
            />
            <Form.Field style={{ paddingBottom: '2rem' }}>
              <button style={{ float: 'left' }} type="button" className="btn edit" onClick={this.onToggleEdit}><Icon name="pencil" /> Editar</button>
              <button style={{ float: 'right' }} type="submit" className="btn save">Guardar cambios</button>
            </Form.Field>
          </Form>
        </div>
        <SaveModal isOpen={this.state.isSaveModalOpen} handleCancel={this.handleModalOpen} handleSave={this.saveChanges} />
        {this.props.myinvests.length ? (
          <Card>
            <Card.Content>
              <Card.Header>
                Inversiones
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <LoanList loanList={this.props.myinvests} />
            </Card.Content>
          </Card>
        ) : ''}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing.location,
  investor: state.investor,
  myinvests: state.myinvests.loans,
});

export default withRouter(connect(mapStateToProps)(Inversionista));
