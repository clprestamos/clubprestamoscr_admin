import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

const Footer = (props) => {
  const footerComponent = !props.hide ? (
    <footer>
      <div className="left-content">
        <p className="copyright">Club de Préstamos © 2017 San José, Costa Rica</p>
        <p className="footer-links"><Link to="/terminosycondiciones">Términos y condiciones</Link> | <Link to="/politicasyprivacidad">Políticas de Privacidad</Link></p>
      </div>
      <div className="right-content">
        <ul>
          <li>Síganos</li>
          {/* <li>
            <a href="http://twiiter.com" rel="noopener noreferrer" target="_blank">
              <Icon.Group>
                <Icon inverted size="big" name="circle" />
                <Icon name="twitter" />
              </Icon.Group>
            </a>
          </li> */}
          <li>
            <a href="http://facebook.com" rel="noopener noreferrer" target="_blank">
              <Icon.Group>
                <Icon inverted size="big" name="circle" />
                <Icon name="facebook" />
              </Icon.Group>
            </a>
          </li>
          <li>
            <a href="http://youtube.com" rel="noopener noreferrer" target="_blank">
              <Icon.Group>
                <Icon inverted size="big" name="circle" />
                <Icon name="youtube play" />
              </Icon.Group>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  ) : '';
  return footerComponent;
};

Footer.propTypes = {
  hide: PropTypes.bool.isRequired,
};

export default Footer;
