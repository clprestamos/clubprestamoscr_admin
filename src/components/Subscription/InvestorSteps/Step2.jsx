import React, { Component } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import * as utils from '../../../utils';

import InputField from '../../InputField';
import Recaptcha from '../../Recaptcha';

class Step2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrors: true,
      password: '',
    };
    autobind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      hasErrors: !(nextProps.investorInfo.password !== '' && nextProps.captcha !== ''),
    });
  }
  handleSubmit() {
    if (!this.state.hasErrors && this.props.captcha) {
      this.props.handleSubmit();
    }
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
    const { onChangeField, investorInfo } = this.props;
    const inputFields = [{
      id: 1,
      placeholder: 'Password *',
      hasError: false,
      errorMessage: 'Campo requerido. Mínimo 8 caracteres, Máximo 16 caracteres.',
      customClass: 'password',
      inputType: 'password',
      onChangeField: (e) => {
        this.setState({
          password: e.value,
        });
      },
      name: 'password',
      isRequired: true,
      defaultValue: investorInfo.password,
      validation: value => this.validation({ value, type: 'password' }),
    },
    {
      id: 2,
      placeholder: 'Confirmar password *',
      hasError: false,
      errorMessage: 'Los campos no coinciden.',
      customClass: 'password',
      inputType: 'password',
      onChangeField,
      name: 'password',
      isRequired: true,
      validation: (value) => {
        if (value !== this.state.password) {
          this.setState({
            hasErrors: true,
          });
          return true;
        }
        return this.validation({ value, type: 'password' });
      },
    }];
    return (
      <div className="client-subscription step1">
        <Form onSubmit={this.handleSubmit}>
          {
            inputFields.map(inputField => (
              <Form.Field key={inputField.id} className={inputField.customClass ? inputField.customClass : ''}>
                <InputField
                  placeholder={inputField.placeholder}
                  validation={inputField.validation}
                  errorMessage={inputField.errorMessage}
                  inputType={inputField.inputType}
                  onChangeField={inputField.onChangeField}
                  name={inputField.name}
                  isRequired={inputField.isRequired}
                  defaultValue={inputField.defaultValue}
                />
              </Form.Field>
            ))
          }
          <Form.Field className="recaptcha">
            <Recaptcha />
          </Form.Field>
          <button type="submit" className="btn default">{this.props.btnText}</button>
          <span>Campos obligatorios **</span>
        </Form>
      </div>
    );
  }
}

Step2.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  btnText: PropTypes.string.isRequired,
  onChangeField: PropTypes.func.isRequired,
  investorInfo: PropTypes.object.isRequired,
  captcha: PropTypes.string.isRequired,
};

export default Step2;
