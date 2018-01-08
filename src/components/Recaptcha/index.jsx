import React, { Component } from 'react';
import autobind from 'react-autobind';
import ReCAPTCHA from 'react-google-recaptcha';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as Recaptcha from '../../actions/Recaptcha';

class RecaptchaComponent extends Component {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.boundActionCreators = bindActionCreators({
      Recaptcha,
    }, dispatch);
    autobind(this);
  }
  componentWillMount() {
    this.clearRecaptchaValue();
  }
  componentWillUnmount() {
    this.clearRecaptchaValue();
  }
  onChange(value) {
    const { dispatch } = this.props;
    dispatch(Recaptcha.setRecaptchaValue(value));
  }
  onExpired() {
    this.clearRecaptchaValue();
  }
  clearRecaptchaValue() {
    const { dispatch } = this.props;
    dispatch(Recaptcha.clearRecaptchaValue());
  }
  render() {
    const { SITE_KEY } = process.env;
    return (
      <ReCAPTCHA
        ref={(c) => { this.recaptcha = c; }}
        sitekey={SITE_KEY}
        onChange={this.onChange}
        onExpired={this.onExpired}
      />
    );
  }
}

export default withRouter(connect()(RecaptchaComponent));
