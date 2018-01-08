import React, { Component } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import { Input, TextArea, Label } from 'semantic-ui-react';

class InputField extends Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      hasError: false,
    };
  }
  handleChange(e) {
    const hasError = this.props.validation(e.target.value);
    this.props.onChangeField({ field: e.target.name, value: e.target.value, isDisabled: hasError });
    this.setState({
      hasError,
    });
  }
  render() {
    const inputType = this.props.inputType ? this.props.inputType : 'text';
    const classStyle = this.state.hasError ? 'error' : '';
    const inputField = this.props.inputType && this.props.inputType === 'textarea' ? (
      <TextArea
        className={classStyle}
        placeholder={this.props.placeholder}
        onChange={this.handleChange}
        name={this.props.name}
        defaultValue={this.props.defaultValue}
        required={this.props.isRequired}
        disabled={this.props.disabled}
        value={this.props.value ? this.props.value : undefined}
      />
    ) : (
      <Input
        className={classStyle}
        type={inputType}
        placeholder={this.props.placeholder}
        onChange={this.handleChange}
        name={this.props.name}
        defaultValue={this.props.defaultValue}
        required={this.props.isRequired}
        disabled={this.props.disabled}
        value={this.props.value ? this.props.value : undefined}
      />
    );
    return (
      <div>
        {inputField}
        { this.state.hasError && <Label pointing color="red">{this.props.errorMessage}</Label> }
      </div>
    );
  }
}

InputField.propTypes = {
  inputType: PropTypes.string,
  isRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeField: PropTypes.func,
  name: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default InputField;
