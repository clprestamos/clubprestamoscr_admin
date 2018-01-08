import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';

const ButtonComponent = (props) => {
  const buttonClass = props.active ? `btn ${props.buttonType} disabled` : `btn ${props.buttonType}`;
  let btn = props.to ? (
    <Link
      className={`btn ${props.buttonType}`}
      to={props.to}
      onClick={props.onClick}
    >
      <span>{props.text}</span>
    </Link>
  ) : (
    <button type={props.type ? props.type : 'button'} className={buttonClass} onClick={props.onClick} disabled={props.active}>{props.text}</button>
  );
  btn = props.buttonType === 'edit' || props.buttonType === 'cancel-edit' ||
    props.buttonType === 'save' ? (
      <Button
        as="button"
        className={buttonClass}
        icon
        onClick={props.onClick}
        floated={props.floated}
      >
        {props.btnIcon ? (<Icon name={props.btnIcon} />) : ''}
        {props.text}
      </Button>
    ) : btn;
  return btn;
};

ButtonComponent.propTypes = {
  buttonType: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  type: PropTypes.string,
  btnIcon: PropTypes.string,
  floated: PropTypes.string,
};

export default ButtonComponent;
