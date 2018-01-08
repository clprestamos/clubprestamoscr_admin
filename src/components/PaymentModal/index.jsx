import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon, Divider } from 'semantic-ui-react';

const PaymentModal = props => (
  <div className="modal-box payment-modal">
    <div className="box">
      <Divider section />
      { props.payment === 'pago-satisfactorio' ? (
        <Header as="h2" icon>
          <Icon name="paypal" />
          Reporte su Pago
          <Header.Subheader>
            Su pago ha sido realizado, repórtelo a <a href="mailto:info@clubdeprestamos.cr?subject=Notificacion de Pago">info@clubdeprestamos.cr</a>
          </Header.Subheader>
        </Header>
      ) : '' }
      { props.payment === 'pago-cancelado' ? (
        <Header as="h2" icon>
          <Icon.Group>
            <Icon name="paypal" />
            <Icon corner name="dont" />
          </Icon.Group>
          Pago cancelado
          <Header.Subheader>
            Su pago ha sido cancelado desde Paypal, si esta seguro que ya realizó su pago, contáctenos a <a href="mailto:info@clubdeprestamos.cr?subject=Pago cancelado">info@clubdeprestamos.cr</a>
          </Header.Subheader>
        </Header>
      ) : '' }
      <button type="button" className="btn default" onClick={props.handleClose}>OK</button>
    </div>
  </div>
);

PaymentModal.propTypes = {
  payment: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default PaymentModal;
