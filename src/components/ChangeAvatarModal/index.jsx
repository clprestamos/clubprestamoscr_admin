import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';

import UploadButton from '../UploadButton';

const ChangeAvatarModal = props => (
  <Modal
    size="tiny"
    open={props.isOpen}
    className="change-avatar-modal"
  >
    <Modal.Content>
      ¿Desea cambiar la imagen de su avatar?
    </Modal.Content>
    <Modal.Actions>
      <Button className="cancel" onClick={props.handleCancel}>Cancelar</Button>
      <UploadButton
        userId={props.userId}
        render={onPick => <Button className="save" onClick={onPick}>Cambiar</Button>}
      />
    </Modal.Actions>
  </Modal>
);

ChangeAvatarModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default ChangeAvatarModal;
