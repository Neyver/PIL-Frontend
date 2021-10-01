import { useEffect } from 'react';
import { withToastManager } from 'react-toast-notifications';
import PropTypes from 'prop-types';

export const MESSAGE_LEVEL = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

const defaultSetting = {
  autoDismiss: true,
};

export const MessagesManager = {

  Messages: undefined,

  info(message, extraProps) {
    MessagesManager.Messages.add(message, { appearance: MESSAGE_LEVEL.INFO, ...defaultSetting, ...extraProps });
  },

  success(message, extraProps) {
    MessagesManager.Messages.add(message, { appearance: MESSAGE_LEVEL.SUCCESS, ...defaultSetting, ...extraProps });
  },

  warning(message, extraProps) {
    MessagesManager.Messages.add(message, { appearance: MESSAGE_LEVEL.WARNING, ...defaultSetting, ...extraProps });
  },

  error(message, extraProps) {
    MessagesManager.Messages.add(message, { appearance: MESSAGE_LEVEL.ERROR, ...defaultSetting, ...extraProps });
  },
};

const ToastMessage = (props) => {
  useEffect(() => {
    MessagesManager.Messages = props.toastManager;
  }, []);
  return null;
};

ToastMessage.propTypes = {
  toastManager: PropTypes.shape({}),
};

export default withToastManager(ToastMessage);
