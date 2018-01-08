import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

const MessageComponent = props => (
  <Message
    positive={props.positive}
    negative={props.negative}
    floating
    size={props.size ? props.size : null}
    icon={props.icon}
    header={props.header}
    content={props.content}
    onDismiss={props.onDismiss}
  />
);

MessageComponent.propTypes = {
  positive: PropTypes.bool,
  negative: PropTypes.bool,
  icon: PropTypes.string,
  size: PropTypes.string,
  onDismiss: PropTypes.func,
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default MessageComponent;
