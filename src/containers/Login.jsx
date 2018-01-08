import React, { Component } from 'react';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Container, Form } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';

import Logo from '../components/Header/Logo';
import InputField from '../components/InputField';
import Modal from '../components/Modal';
import Message from '../components/Message';
import ForgotPassword from './ForgotPassword';

import * as utils from '../utils';

import * as Login from '../actions/Login';
import * as MainActionCreators from '../actions/';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators({
      Login,
      MainActionCreators,
    }, dispatch);
    this.state = {
      username: '',
      password: '',
      isModalOpen: false,
      hasErrors: false,
      isPaymentModalOpen: props.match.params.payment ? props.match.params.payment : false,
    };
    autobind(this);
  }
  onChangeField(e) {
    this.setState({
      [e.field]: e.value,
    });
  }
  createNotification(type) {
    switch (type) {
      case 'successPassword':
        NotificationManager.success('Un correo electrónico ha sido enviado a su cuenta, con un link para la restauración de su contraseña. Revise su bandeja de entrada o inbox, sino bien revise su bandeja de spam.', 'Cambio de contraseña solicitado', 10000);
        break;
      case 'successChange':
        NotificationManager.success('Ingrese con su nueva contraseña.', 'Cambio de contraseña satisfactorio', 5000);
        break;
      case 'errorPassword':
        NotificationManager.error('Correo no existe', `Error ${this.props.error}`, 5000);
        break;
      case 'errorAuth':
        NotificationManager.error('Verifique correo o contraseña.', 'Error de autenticación', 5000);
        break;
      default:
        NotificationManager.error('Contáctenos', 'Error inesperado', 3000);
        break;
    }
  }
  login() {
    if (!this.state.hasErrors) {
      const { dispatch } = this.props;
      const { username, password } = this.state;
      dispatch(Login.login({ username, password }));
    }
  }
  handleModalOpen() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handlePaymentModal() {
    this.setState({
      isPaymentModalOpen: !this.state.isPaymentModalOpen,
    });
  }
  validation({ type, value }) {
    let result = true;
    if (value === '') result = true;
    if (utils.validateExp({ type, value })) result = false;
    this.setState({
      hasErrors: result,
    });
    return result;
  }
  render() {
    const inputFields = [
      {
        id: 1,
        placeholder: 'Email',
        errorMessage: 'Ingrese un email válido.',
        onChangeField: this.onChangeField,
        name: 'username',
        defaultValue: this.state.username,
        isRequired: true,
        validation: value => this.validation({ value, type: 'email' }),
      },
      {
        id: 2,
        placeholder: 'Contraseña',
        hasError: false,
        errorMessage: 'Mínimo 8 caracteres, Máximo 16 caracteres',
        inputType: 'password',
        onChangeField: this.onChangeField,
        name: 'password',
        isRequired: true,
        defaultValue: this.state.password,
        validation: value => this.validation({ value, type: 'password' }),
      },
    ];
    const errorMessage = this.props.authData.error ? (
      <Message
        negative
        header="Error de autenticación"
        content="Verifique correo o contraseña."
        size="mini"
      />
    ) : '';
    if (this.props.authData.isAuth) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="login">
        <Container fluid>
          <Link to="/"><Logo /></Link>
          <div className="login-box">
            <div className="box">
              <div className="divider" />
              <h3>Ingreso de usuario</h3>
              <p>Digite su correo y contraseña ingresadas al sistema.</p>
              <Form onSubmit={this.login}>
                {
                  inputFields.map(inputField => (
                    <Form.Field key={inputField.id}>
                      <InputField
                        placeholder={inputField.placeholder}
                        validation={inputField.validation}
                        errorMessage={inputField.errorMessage}
                        inputType={inputField.inputType}
                        onChangeField={inputField.onChangeField}
                        name={inputField.name}
                        defaultValue={inputField.defaultValue}
                        isRequired={inputField.isRequired}
                      />
                    </Form.Field>
                  ))
                }
                {errorMessage}
                <button
                  type="submit"
                  className="btn default"
                  style={this.props.authData.error ? { marginTop: '5px' } : {}}
                >
                  Ingresar
                </button>
              </Form>
              <Modal
                className="modal"
                trigger={<button className="forgot-password" onClick={this.handleModalOpen}>¿Olvidaste la contraseña?</button>}
                isOpen={this.state.isModalOpen}
                onClose={this.handleModalOpen}
                component={<ForgotPassword closeSelf={this.handleModalOpen} />}
              />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authData: state.user,
  isForgotPasswordSuccess: state.forgotPassword.isSuccess,
  isChangeSuccess: state.forgotPassword.isChangeSuccess,
  errorForgotPassword: state.forgotPassword.error,
});

export default withRouter(connect(mapStateToProps)(LoginComponent));
