import React, { Component } from 'react';
import autobind from 'react-autobind';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

import * as utils from '../../utils';
import InputField from '../InputField';

import Message from '../Message';

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasErrors: false,
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    };
    autobind(this);
  }
  onChangeField(item) {
    this.setState({
      [item.field]: item.value,
    });
  }
  handleSendMessage() {
    if (!this.state.hasErrors) {
      this.props.handleSendMessage(this.state);
    }
  }
  validation({ value, type }) {
    let result = true;
    if (value === '') result = true;
    if (utils.validateExp({ type, value })) result = false;
    this.setState({
      hasErrors: result,
    });
    return result;
  }
  render() {
    const message = this.props.sent ? (
      <Message
        positive
        size="mini"
        icon="mail"
        header="Mensaje enviado"
        content="Su mensaje ha sido enviado, será contactado por alguno de nuestros representantes."
      />
    ) : '';
    return (
      <div className="contact-us">
        <h2>¡Contáctenos!</h2>
        <Form onSubmit={this.handleSendMessage}>
          <Form.Field>
            <InputField
              placeholder="Nombre"
              validation={value => this.validation({ value, type: 'text' })}
              errorMessage="Campo requerido."
              onChangeField={this.onChangeField}
              name="name"
              defaultValue={this.state.name}
              isRequired
            />
            <InputField
              placeholder="Email"
              validation={value => this.validation({ value, type: 'email' })}
              errorMessage="Campo requerido."
              onChangeField={this.onChangeField}
              name="email"
              defaultValue={this.state.email}
              isRequired
            />
          </Form.Field>
          <Form.Field>
            <InputField
              placeholder="Teléfono"
              validation={value => this.validation({ value, type: 'phone' })}
              errorMessage="Campo requerido."
              onChangeField={this.onChangeField}
              name="phone"
              defaultValue={this.state.phone}
              isRequired
            />
            <InputField
              placeholder="Asunto"
              validation={value => this.validation({ value, type: 'text' })}
              errorMessage="Campo requerido."
              onChangeField={this.onChangeField}
              name="subject"
              defaultValue={this.state.subject}
              isRequired
            />
          </Form.Field>
          <Form.Field style={{ flexFlow: 'column' }}>
            <InputField
              placeholder="Mensaje"
              validation={value => this.validation({ value, type: 'text' })}
              errorMessage="Campo requerido."
              inputType="textarea"
              onChangeField={this.onChangeField}
              name="message"
              defaultValue={this.state.message}
              isRequired
            />
          </Form.Field>
          {message}
          <button type="submit" className="btn default">Enviar</button>
        </Form>
        <div className="scroll">
          <a href="#acerca-de-nosotros"><span /></a>
        </div>
      </div>
    );
  }
}

ContactUs.propTypes = {
  handleSendMessage: PropTypes.func.isRequired,
  sent: PropTypes.bool.isRequired,
};

export default ContactUs;
