import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Image } from 'semantic-ui-react';

const Hero = (props) => {
  const { roleId, avatar } = props.authData.data;
  let legend = (
    <p>Aquí el sistema muestra el detalle de tu solictud de crédito, tu score credicticio y puedes manejar tu información de usuario.</p>
  );
  if (roleId === 2) {
    legend = (
      <div>
        <p>Aquí el sistema le muestra el total de oportunidades de inversión que están disponibles.</p>
        <p>Así como el total de operaciones en las que ha invertido.</p>
      </div>
    );
  }
  return (
    <div className={`hero box ${roleId === 2 ? 'investor' : 'client'}`}>
      {!avatar ? <Image src="https://react.semantic-ui.com/assets/images/wireframe/square-image.png" size="tiny" circular /> : <Icon circular inverted name="home" size="big" color="teal" />}
      <p className="welcome">Hola {props.authData.data.name} bienvenido a tu cuenta.</p>
      {legend}
    </div>
  );
};

Hero.propTypes = {
  authData: PropTypes.object.isRequired,
};

export default Hero;
