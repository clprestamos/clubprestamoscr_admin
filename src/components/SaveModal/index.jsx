import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';

const SaveModal = props => (
  <Modal
    size="tiny"
    open={props.isOpen}
    className="save-modal"
  >
    <Modal.Content>
      ¿Desea guardar los cambios efectuados?
    </Modal.Content>
    <Modal.Actions>
      <Button className="cancel" onClick={props.handleCancel}>Cancelar</Button>
      <Button className="save" onClick={props.handleSave}>Guardar</Button>
    </Modal.Actions>
  </Modal>
);

SaveModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default SaveModal;
