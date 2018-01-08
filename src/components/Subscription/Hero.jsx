import React from 'react';
import PropTypes from 'prop-types';

import Divider from '../Divider';

const Hero = props => (
  <div className="static-content" style={props.styles}>
    <div className="title">
      <h1>{props.title}</h1>
      <Divider />
    </div>
    <div className="content">
      {props.content}
    </div>
  </div>
);

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  styles: PropTypes.object,
};

export default Hero;
