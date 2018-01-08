import React from 'react';
import PropTypes from 'prop-types';
import Step1 from './Step1';
import Step2 from './Step2';

const InvestorSteps = (props) => {
  const { investorInfo, captcha } = props;
  const { step1, step2 } = investorInfo;
  let stepContent = (
    <Step1
      handleSubmit={step1.handleNextOnclick}
      onChangeField={step1.onChangeField}
      investorInfo={investorInfo}
      btnText="Siguiente"
    />
  );
  if (step1.isActive) {
    stepContent = (
      <Step1
        handleSubmit={step1.handleNextOnclick}
        onChangeField={step1.onChangeField}
        investorInfo={investorInfo}
        btnText="Siguiente"
      />
    );
  } else if (step2.isActive) {
    stepContent = (
      <Step2
        handleSubmit={step2.handleNextOnclick}
        onChangeField={step2.onChangeField}
        investorInfo={investorInfo}
        btnText="Enviar datos"
        captcha={captcha}
      />
    );
  }
  return stepContent;
};

InvestorSteps.propTypes = {
  investorInfo: PropTypes.object.isRequired,
  captcha: PropTypes.string.isRequired,
};

export default InvestorSteps;
