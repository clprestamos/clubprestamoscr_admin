import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

const Steps = (props) => {
  const { step1, step2, step3 } = props;
  const ovals = (
    <li className="ovals">
      <ul>
        <li className="oval" />
        <li className="oval" />
        <li className="oval" />
      </ul>
    </li>
  );
  const buttonStep1 = step1.isComplete ? (
    <button className="complete" onClick={step1.handleClick}><Icon name="check" /></button>
  ) : (
    <button className={`${step1.isActive ? 'active' : ''}`}>1</button>
  );
  const buttonStep2 = step2.isComplete ? (
    <button className="complete" onClick={step2.handleClick}><Icon name="check" /></button>
  ) : (
    <button className={`${step2.isActive ? 'active' : ''}`}>2</button>
  );
  let buttonStep3 = '';
  if (step3) {
    buttonStep3 = step3.isComplete ? (
      <button className="complete" onClick={step3.handleClick}><Icon name="check" /></button>
    ) : (
      <button className={`${step3.isActive ? 'active' : ''}`}>3</button>
    );
  }
  return (
    <div className="steps">
      {props.title}
      <ul className="numbers">
        <li>{buttonStep1}</li>
        {ovals}
        <li>{buttonStep2}</li>
        {buttonStep3 ? ovals : ''}
        {buttonStep3 ? (
          <li>{buttonStep3}</li>
        ) : ''}
      </ul>
    </div>
  );
};

Steps.propTypes = {
  title: PropTypes.object.isRequired,
  step1: PropTypes.shape({
    isActive: PropTypes.bool,
    isComplete: PropTypes.bool,
    handleClick: PropTypes.func,
  }),
  step2: PropTypes.shape({
    isActive: PropTypes.bool,
    isComplete: PropTypes.bool,
    handleClick: PropTypes.func,
  }),
  step3: PropTypes.shape({
    isActive: PropTypes.bool,
    isComplete: PropTypes.bool,
    handleClick: PropTypes.func,
  }),
};

export default Steps;
