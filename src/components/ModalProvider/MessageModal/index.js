import React from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const MessageModal = (props) => {
  const {
    onClose, title, message, messageProps,
  } = props;

  return (
    <Message onDismiss={onClose} {...messageProps}>
      <Message.Header>
        {title}
      </Message.Header>
      <Message.Content>
        {message}
      </Message.Content>
    </Message>
  );
};

MessageModal.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  messageProps: PropTypes.shape(Message.propTypes),
};

export default MessageModal;
