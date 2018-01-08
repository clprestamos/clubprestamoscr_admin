import React, { Component } from 'react';
import autobind from 'react-autobind';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Container, Form } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';

import Logo from '../components/Header/Logo';
import InputField from '../components/InputField';
import Button from '../components/Button';

import * as utils from '../utils';

import * as ForgotPassword from '../actions/ForgotPassword';
import * as MainActionCreators from '../actions';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators({
      ForgotPassword,
      MainActionCreators,
    }, dispatch);
    this.state = {
      password: '',
      hasErrors: false,
    };
    autobind(this);
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(ForgotPassword.clearForgotPassword());
  }
  componentDidMount() {
    const { dispatch, match } = this.props;
    const { passwordKey } = match.params;
    dispatch(ForgotPassword.getUserId(passwordKey));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.createNotification('error');
    }
  }
  onChangePassword(e) {
    const { dispatch } = this.props;
    dispatch(ForgotPassword.setNewPassword(e.value));
  }
  handleOnSubmit() {
    if (!this.state.hasErrors) {
      const { dispatch } = this.props;
      const { password } = this.state;
      dispatch(ForgotPassword.changeUserPassword(password));
    }
  }
  createNotification(type) {
    switch (type) {
      case 'error':
        NotificationManager.error('Token inválido', 'Error', 3000);
        break;
      default:
        NotificationManager.error('Contáctenos', 'Error inesperado', 3000);
        break;
    }
  }
  render() {
    const inputFields = [{
      id: 1,
      placeholder: 'Password *',
      errorMessage: 'Campo requerido. Mínimo 8 caracteres, Máximo 16 caracteres.',
      customClass: 'password',
      inputType: 'password',
      isRequired: true,
      onChangeField: (e) => {
        this.setState({
          password: e.value,
        });
      },
      name: 'password',
      defaultValue: this.state.password,
      validation: (value) => {
        if (value === '') {
          this.setState({
            hasErrors: true,
          });
          return true;
        }
        if (utils.validateExp({ type: 'password', value })) {
          this.setState({
            hasErrors: false,
          });
          return false;
        }
        this.setState({
          hasErrors: true,
        });
        return true;
      },
    },
    {
      id: 2,
      placeholder: 'Confirmar password *',
      errorMessage: 'Los campos no coinciden.',
      customClass: 'password',
      inputType: 'password',
      isRequired: true,
      onChangeField: this.onChangePassword,
      name: 'confirm',
      validation: (value) => {
        if (value === '') {
          this.setState({
            hasErrors: true,
          });
          return true;
        }
        if (value === this.state.password) {
          this.setState({
            hasErrors: false,
          });
          return false;
        }
        this.setState({
          hasErrors: true,
        });
        return true;
      },
    }];
    const content = this.props.error ? (
      <div className="box">
        <div className="divider" />
        <h3>Token inválido o ya expiró</h3>
        <p>Vuelva hacer la solicitud de cambio de contraseña.</p>
        <Button
          to="/login"
          buttonType="default"
          text="Solicitar cambio"
        />
      </div>
    ) : (
      <div className="box">
        <div className="divider" />
        <h3>Nueva contraseña</h3>
        <p>Digite su nueva contraseña al sistema.</p>
        <Form onSubmit={this.handleOnSubmit}>
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
          <button type="submit" className="btn default">Cambiar</button>
        </Form>
      </div>
    );
    return (
      <div className="change-password">
        { this.props.isChangeSuccess ? (
          <Redirect to="/login" />
        ) : (
          <Container fluid>
            <Logo />
            <div className="change-password-box">
              {content}
            </div>
          </Container>
        ) }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isChangeSuccess: state.forgotPassword.isChangeSuccess,
  error: state.forgotPassword.error,
});

export default withRouter(connect(mapStateToProps)(ChangePassword));
