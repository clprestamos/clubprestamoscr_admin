import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';

const ModalComponent = props => (
  <Modal
    trigger={props.trigger}
    open={props.isOpen}
    onClose={props.onClose}
    basic={props.isBasic !== undefined ? props.isBasic : true}
    size={props.size ? props.size : 'small'}
    className={props.className}
  >
    <Modal.Content>
      {props.component}
    </Modal.Content>
  </Modal>
);

ModalComponent.propTypes = {
  isBasic: PropTypes.bool,
  size: PropTypes.string,
  trigger: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  component: PropTypes.object.isRequired,
};

export default ModalComponent;
