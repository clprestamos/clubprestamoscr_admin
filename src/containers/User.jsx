/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { Image, List, Header, Icon, Form, Message } from 'semantic-ui-react';

import * as utils from '../utils';
import * as Users from '../actions/Users';

import SaveModal from '../components/SaveModal';
import ChangeAvatarModal from '../components/ChangeAvatarModal';

class User extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators({
      Users,
    }, dispatch);
    this.state = {
      hasErrors: false,
      isSaveModalOpen: false,
      isChangeAvatarModalOpen: false,
      password: false,
      confirmPassword: '',
    };
    autobind(this);
  }
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(Users.getUserInfo(match.params.id));
  }
  onChangeField(e) {
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
    const { dispatch } = this.props;
    dispatch(Users.editUserInfo({ field: e.target.name, value: e.target.value }));
  }
  onChangeConfirmPassword(e) {
    const isValid = this.validation({ type: e.target.type, value: e.target.value });
    if (this.props.users.user.data.password !== e.target.value) {
      this.setState({
        confirmPasswordError: true,
        hasErrors: true,
        confirmPassword: e.target.value,
      });
    } else {
      this.setState({
        confirmPasswordError: !isValid,
        hasErrors: !isValid,
        confirmPassword: e.target.value,
      });
    }
  }
  onToggleChange() {
    const { dispatch } = this.props;
    dispatch(Users.editUserInfo({ field: 'isActive', value: !this.props.user.data.isActive }));
  }
  onSubmitForm() {
    if (!this.state.hasErrors) {
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
    });
  }
  handleChangeAvatarModalOpen() {
    this.setState({
      isChangeAvatarModalOpen: !this.state.isChangeAvatarModalOpen,
    });
  }
  saveChanges() {
    this.handleModalOpen();
    const { dispatch, match } = this.props;
    dispatch(Users.saveUserInfo(match.params.id));
  }
  render() {
    const { data } = this.props.users.user;
    return (
      <div className="user">
        <h1>Detalle del usuario</h1>
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
          <Form onSubmit={this.onSubmitForm} success={this.props.users.saveSuccess} error={this.props.users.error}>
            <Form.Group>
              <Form.Input width={6} readOnly label="Fecha de Ingreso:" onChange={this.onChangeField} name="signupDate" type="text" value={utils.parseDate(data.signupDate)} />
              <Form.Input width={6} readOnly label="Email:" onChange={this.onChangeConfirmPassword} name="email" type="email" value={data.email} required error={this.state.email} />
              <Form.Input width={6} label="Password:" onChange={this.onChangeField} name="password" type="password" value={!data.password ? '' : data.password} required error={this.state.password} />
              <Form.Input width={6} label="Confirmar password:" onChange={this.onChangeConfirmPassword} name="password" type="password" value={this.state.confirmPassword} required error={this.state.confirmPasswordError} />
            </Form.Group>
            <Message
              success
              header="Cambios Guardados"
              content="Los cambios fueron guardados"
            />
            <Message
              error
              header="Error"
              content={`Ocurrió un error. ${this.props.users.error}`}
            />
            {this.state.confirmPasswordError ? (
              <Message
                error
                header="Confirmación de password"
                content="Passwords no coinciden."
                visible
              />
            ) : ''}
            <Form.Field style={{ paddingBottom: '2rem' }}>
              <button style={{ float: 'right' }} type="submit" className="btn save">Guardar cambios</button>
            </Form.Field>
          </Form>
        </div>
        <SaveModal isOpen={this.state.isSaveModalOpen} handleCancel={this.handleModalOpen} handleSave={this.saveChanges} />
        <ChangeAvatarModal isOpen={this.state.isChangeAvatarModalOpen} handleCancel={this.handleChangeAvatarModalOpen} userId={data.userId} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  routing: state.routing.location,
  users: state.users,
});

export default withRouter(connect(mapStateToProps)(User));
