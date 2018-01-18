/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import autobind from 'react-autobind';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { Image, List, Header, Icon, Form, Message, Dropdown, Card } from 'semantic-ui-react';

import * as utils from '../utils';
import * as MainActionCreators from '../actions/';
import * as Client from '../actions/Client';
import * as LoansByClient from '../actions/LoansByClient';
import * as Locales from '../actions/Locales';

import SaveModal from '../components/SaveModal';
import ChangeAvatarModal from '../components/ChangeAvatarModal';
import LoanList from '../components/LoanList';

class Cliente extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators({
      MainActionCreators,
      Client,
      LoansByClient,
      Locales,
    }, dispatch);
    this.state = {
      hasErrors: false,
      readOnly: true,
      isSaveModalOpen: false,
      isChangeAvatarModalOpen: false,
      name: false,
      lastName: false,
      email: false,
      identification: false,
      nationality: false,
      address: false,
      cellphone: false,
      referencePhone: false,
      relativePhone: false,
      bank: false,
      clientAccount: false,
      iban: false,
    };
    autobind(this);
  }
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(Client.getClientInfo(match.params.id));
    dispatch(LoansByClient.getLoansByClient(match.params.id));
    dispatch(Locales.getProvinces());
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.client.data.province && _.isEmpty(nextProps.cantons) && _.isEmpty(nextProps.districts)) {
      this.getCantons(nextProps.client.data.province);
      this.getDistricts(nextProps.client.data.canton);
    }
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
    dispatch(Client.editClientProfile({ field: e.target.name, value: e.target.value }));
  }
  onDropdownChange({ field, value }) {
    const { dispatch } = this.props;
    dispatch(Client.editClientProfile({ field, value }));
  }
  onToggleChange() {
    if (!this.state.readOnly) {
      const { dispatch } = this.props;
      dispatch(Client.editClientProfile({ field: 'isActive', value: !this.props.client.data.isActive }));
    }
  }
  onToggleEdit() {
    this.setState({
      readOnly: !this.state.readOnly,
    });
  }
  onSubmitForm() {
    if (!this.state.hasErrors && !this.state.readOnly) {
      this.handleSaveModalOpen();
    }
  }
  onChangeProvinces(province) {
    this.getCantons(province);
  }
  onChangeCantons(canton) {
    this.getDistricts(canton);
  }
  onChangeDistricts() {
    const { dispatch } = this.props;
    dispatch(Client.getZipCode());
  }
  getCantons(province) {
    const { dispatch } = this.props;
    dispatch(Locales.getCantons(province));
  }
  getDistricts(canton) {
    if (!_.isEmpty(this.props.client.data.province)) {
      const { dispatch } = this.props;
      dispatch(Locales.getDistricts(this.props.client.data.province, canton));
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
  handleSaveModalOpen() {
    this.setState({
      isSaveModalOpen: !this.state.isSaveModalOpen,
      readOnly: true,
    });
  }
  handleChangeAvatarModalOpen() {
    this.setState({
      isChangeAvatarModalOpen: !this.state.isChangeAvatarModalOpen,
    });
  }
  saveChanges() {
    this.handleSaveModalOpen();
    const { dispatch, match } = this.props;
    dispatch(Client.saveClientInfo(match.params.id));
  }
  render() {
    const { data } = this.props.client;
    const provinces = utils.getDropDownItems(this.props.provinces);
    const cantons = utils.getDropDownItems(this.props.cantons);
    const districts = utils.getDropDownItems(this.props.districts);
    return (
      <div className="client">
        <h1>Detalle del cliente</h1>
        <div className="content">
          <div className="header">
            <div className="user-info">
              <List horizontal>
                <List.Item>
                  <Image circular src={data.avatar ? data.avatar : 'https://react.semantic-ui.com/assets/images/wireframe/square-image.png'} size="tiny" onClick={this.handleChangeAvatarModalOpen} />
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
                    <Header as="h5" icon onClick={this.onToggleChange}>
                      {data.isActive ? 'Activo' : 'Inactivo'}
                      <Icon name={`toggle ${data.isActive ? 'on' : 'off'}`} />
                    </Header>
                  </List.Content>
                </List.Item>
              </List>
            </div>
          </div>
          <Form onSubmit={this.onSubmitForm} success={this.props.client.saveSuccess} error={this.props.client.error}>
            <Form.Group>
              <Form.Input width={6} readOnly={this.state.readOnly} label="Nombre:" onChange={this.onChangeField} name="name" type="text" value={data.name} required error={this.state.name} />
              <Form.Input width={6} readOnly={this.state.readOnly} label="Apellidos:" onChange={this.onChangeField} name="lastName" type="text" value={data.lastName} required error={this.state.lastName} />
              <Form.Input width={6} readOnly={this.state.readOnly} label="Email:" onChange={this.onChangeField} name="email" type="email" value={data.email} required error={this.state.email} />
            </Form.Group>
            <Form.Group>
              <Form.Input width={6} readOnly={this.state.readOnly} label="Cédula:" onChange={this.onChangeField} name="identification" type="text" value={data.identification} required error={this.state.identification} />
              <Form.Input width={6} readOnly={this.state.readOnly} label="Nacionalidad:" onChange={this.onChangeField} name="nationality" type="text" value={data.nationality} required error={this.state.nationality} />
              <Form.Input width={6} readOnly={this.state.readOnly} label="Dirección:" onChange={this.onChangeField} name="address" type="text" value={data.address} required error={this.state.address} />
            </Form.Group>
            <Form.Group>
              <Form.Input width={6} readOnly={this.state.readOnly} label="Celular:" onChange={this.onChangeField} name="cellphone" type="tel" value={data.cellphone} required error={this.state.cellphone} />
              <Form.Input width={6} readOnly={this.state.readOnly} label="Referencia:" onChange={this.onChangeField} name="referencePhone" type="tel" value={data.referencePhone} required error={this.state.referencePhone} />
              <Form.Input width={6} readOnly={this.state.readOnly} label="Teléfono de familiar:" onChange={this.onChangeField} name="relativePhone" type="text" value={data.relativePhone} required error={this.state.relativePhone} />
            </Form.Group>
            <Form.Group>
              <Form.Field className="signup-date">
                <label>Fecha de ingreso:</label>
                <input name="signupDate" type="date" readOnly={this.state.readOnly} onChange={this.onChangeField} value={utils.parseDate(data.signupDate)} required />
              </Form.Field>
              <Form.Field className="province">
                <label>Provincia:</label>
                <Dropdown
                  placeholder="Provincia"
                  fluid
                  search
                  selection
                  options={provinces}
                  onChange={(e, { value }) => {
                    this.onDropdownChange({ field: 'province', value });
                    this.onChangeProvinces(value);
                  }}
                  value={data.province}
                  disabled={this.state.readOnly}
                />
              </Form.Field>
              <Form.Field className="canton">
                <label>Cantón:</label>
                <Dropdown
                  placeholder="Cantón"
                  fluid
                  search
                  selection
                  options={cantons}
                  onChange={(e, { value }) => {
                    this.onDropdownChange({ field: 'canton', value });
                    this.onChangeCantons(value);
                  }}
                  value={data.canton}
                  disabled={this.state.readOnly}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field className="district">
                <label>Distrito:</label>
                <Dropdown
                  placeholder="Distrito"
                  fluid
                  search
                  selection
                  options={districts}
                  onChange={(e, { value }) => {
                    this.onDropdownChange({ field: 'district', value });
                    this.onChangeDistricts(value);
                  }}
                  value={data.district}
                  disabled={this.state.readOnly}
                />
              </Form.Field>
              <Form.Input width={6} readOnly label="Código Postal:" onChange={this.onChangeField} name="zipCode" type="text" value={data.zipCode} />
              <Form.Input width={6} readOnly={this.state.readOnly} label="Banco:" onChange={this.onChangeField} name="bank" type="text" value={!data.bank ? '' : data.bank} required error={this.state.bank} />
            </Form.Group>
            <Form.Group>
              <Form.Input width={6} readOnly={this.state.readOnly} label="Cuenta cliente:" onChange={this.onChangeField} name="clientAccount" type="text" value={!data.clientAccount ? '' : data.clientAccount} required error={this.state.clientAccount} />
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
              content={`Ocurrió un error. ${this.props.client.error}`}
            />
            <Form.Field style={{ paddingBottom: '2rem' }}>
              <button style={{ float: 'left' }} type="button" className="btn edit" onClick={this.onToggleEdit}><Icon name="pencil" /> Editar</button>
              <button style={{ float: 'right' }} type="submit" className="btn save">Guardar cambios</button>
            </Form.Field>
          </Form>
        </div>
        <SaveModal isOpen={this.state.isSaveModalOpen} handleCancel={this.handleSaveModalOpen} handleSave={this.saveChanges} />
        <ChangeAvatarModal isOpen={this.state.isChangeAvatarModalOpen} handleCancel={this.handleChangeAvatarModalOpen} userId={data.userId} />
        <Card>
          <Card.Content>
            <Card.Header>
              Detalle del Préstamo
            </Card.Header>
          </Card.Content>
          <Card.Content>
            <LoanList loanList={this.props.loansByClient.data} />
          </Card.Content>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing.location,
  client: state.client,
  provinces: state.locales.provinces,
  cantons: state.locales.cantons,
  districts: state.locales.districts,
  loansByClient: state.loansByClient,
});

export default withRouter(connect(mapStateToProps)(Cliente));
