import React from 'react';
import PropTypes from 'prop-types';

import Divider from '../../Divider';
import Steps from '../Steps';
import ClientSteps from '../ClientSteps';

const SubscriptionFormClient = props => (
  <div className="subscription-form">
    <div>
      <h3>Por favor proporcionar su información básica de contacto</h3>
      <Divider />
      <Steps
        title={<p><b>¡Ya casi está listo!</b> Continuar con el paso <span>{props.currentStep}</span> de {props.maxSteps}</p>}
        step1={props.clientInfo.step1}
        step2={props.clientInfo.step2}
        step3={props.clientInfo.step3}
      />
      <ClientSteps clientInfo={props.clientInfo} captcha={props.captcha} />
    </div>
  </div>
);

SubscriptionFormClient.propTypes = {
  currentStep: PropTypes.string.isRequired,
  maxSteps: PropTypes.string.isRequired,
  clientInfo: PropTypes.object.isRequired,
  captcha: PropTypes.string.isRequired,
};

export default SubscriptionFormClient;
