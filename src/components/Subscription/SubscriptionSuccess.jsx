import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

import Button from '../Button';
import Paypal from '../Paypal';

const SubscriptionSuccess = props => (
  <div className="subscription-success">
    <div>
      <h3><Icon name="check" className="oval" /> Formulario Enviado con éxito</h3>
      <div className="divider" />
      { props.roleId === 'client' ? (
        <div className="payment-process">
          <Header as="h2" icon>
            <Icon name="paypal" />
            Solicitud de análisis credicticio.
            <Header.Subheader>
              Pague $15 para que nosotros hagamos un análisis de su historial de crédito.
              Basado en este análisis su score e interés será calculado.
            </Header.Subheader>
          </Header>
          <Paypal />
        </div>
      ) : (
        <div>
          <p>Gracias por iniciar el proceso de solicitud de registro como usuario de Club de Préstamos. Nuestro equipo revisará la información suministrada.</p>
          <p>Por favor, ir al &quot;inbox&quot; del correo electrónico que utilizó en el formulario.</p>
          <p>Ahí encontrará un correo con el usuario y los siguientes pasos para continuar con el proceso.</p>
          <Button
            buttonType="default"
            to="/login"
            text="Iniciar Sesión"
          />
        </div>
      ) }
    </div>
  </div>
);

export default SubscriptionSuccess;
