import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import autobind from 'react-autobind';
import { bindActionCreators } from 'redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import InputField from '../components/InputField';
import * as utils from '../utils';

import * as FPActionCreators from '../actions/ForgotPassword';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators({
      FPActionCreators,
    }, dispatch);
    autobind(this);
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(FPActionCreators.clearForgotPassword());
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.createNotification('error');
    }
  }
  onChangeField(e) {
    const { dispatch } = this.props;
    dispatch(FPActionCreators.setEmail(e.value));
  }
  handleOnSubmit() {
    this.props.closeSelf();
    const { dispatch } = this.props;
    dispatch(FPActionCreators.requestNewPassword());
  }
  handleCancel() {
    this.props.closeSelf();
  }
  createNotification(type) {
    switch (type) {
      case 'error':
        NotificationManager.error(this.props.error, 'Error', 3000);
        break;
      default:
        NotificationManager.error('Contáctenos', 'Error inesperado', 3000);
        break;
    }
  }
  render() {
    return (
      <div className="modal-box forgot-password">
        <div className="box">
          <div className="divider" />
          <h3>Cambiar Contraseña</h3>
          <Form onSubmit={this.handleOnSubmit}>
            <Form.Field>
              <p>Usuario</p>
              <InputField
                placeholder="Email"
                validation={(value) => {
                  if (value === '') return true;
                  if (utils.validateExp({ type: 'email', value })) return false;
                  return true;
                }}
                errorMessage="Digite un correo electrónico válido"
                inputType="email"
                onChangeField={this.onChangeField}
                name="email"
                defaultValue={this.props.email}
                isRequired
              />
            </Form.Field>
            <Form.Field className="btn-group">
              <button type="button" className="btn cancel" onClick={this.handleCancel}>Cancelar</button>
              <button type="submit" className="btn default">Enviar solicitud</button>
            </Form.Field>
          </Form>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  closeSelf: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  email: state.forgotPassword.email,
  error: state.forgotPassword.error,
});

export default connect(mapStateToProps)(ForgotPassword);
