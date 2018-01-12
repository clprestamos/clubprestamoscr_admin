import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'semantic-ui-react';

import CardContent from './CardContent';

const CardComponent = props => (
  <Card>
    <Card.Content>
      <Card.Header>
        {props.headerText} <Link to={props.headerLink} onClick={() => props.handleLink(props.headerLink)}><Icon name="ellipsis horizontal" /></Link>
      </Card.Header>
    </Card.Content>
    <Card.Content>
      <CardContent data={props.data} baseLink={props.headerLink} handleLink={props.handleLink} />
    </Card.Content>
    <Card.Content className="bottom">
      <Link to={props.bottomLink} onClick={() => props.handleLink(props.bottomLink)}>{props.bottomText}</Link>
    </Card.Content>
  </Card>
);

CardComponent.propTypes = {
  headerText: PropTypes.string.isRequired,
  headerLink: PropTypes.string.isRequired,
  bottomText: PropTypes.string.isRequired,
  bottomLink: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  handleLink: PropTypes.func.isRequired,
};

export default CardComponent;
