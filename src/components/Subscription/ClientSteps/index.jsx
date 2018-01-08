import React from 'react';
import PropTypes from 'prop-types';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const ClientSteps = (props) => {
  const { clientInfo, captcha } = props;
  const { step1, step2, step3 } = clientInfo;
  let stepContent = (
    <Step1
      handleSubmit={step1.handleNextOnclick}
      onChangeField={step1.onChangeField}
      clientInfo={clientInfo}
      btnText="Siguiente"
    />
  );
  if (step1.isActive) {
    stepContent = (
      <Step1
        handleSubmit={step1.handleNextOnclick}
        onChangeField={step1.onChangeField}
        clientInfo={clientInfo}
        btnText="Siguiente"
      />
    );
  } else if (step2.isActive) {
    stepContent = (
      <Step2
        handleSubmit={step2.handleNextOnclick}
        onChangeField={step2.onChangeField}
        clientInfo={clientInfo}
        getCantons={step2.getCantons}
        getDistricts={step2.getDistricts}
        getZipCode={step2.getZipCode}
        provinces={step2.provinces}
        cantons={step2.cantons}
        districts={step2.districts}
        btnText="Siguiente"
      />
    );
  } else if (step3.isActive) {
    stepContent = (
      <Step3
        handleSubmit={step3.handleNextOnclick}
        onChangeField={step3.onChangeField}
        clientInfo={clientInfo}
        btnText="Enviar Datos"
        captcha={captcha}
      />
    );
  }
  return stepContent;
};

ClientSteps.propTypes = {
  clientInfo: PropTypes.object.isRequired,
  captcha: PropTypes.string.isRequired,
};

export default ClientSteps;
