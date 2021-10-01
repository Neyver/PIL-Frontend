import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router';

/**
 * A replacement component for the react-router `Prompt`.
 * Allows for more flexible dialogs.
 */

const NavigationPrompt = (props) => {
  const { children, when } = props;
  const [nextLocation, setNextLocation] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [unblock, setUnblock] = useState(() => { });
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setUnblock(() => (history.block((newNextLocation) => {
      if (when) {
        setOpenModal(true);
        setNextLocation(newNextLocation);
      }
      return !when;
    })));
  }, []);

  const navigateToNextLocation = () => {
    if (location.pathname === nextLocation.pathname) {
      setOpenModal(false);
      setNextLocation(null);
    } else {
      unblock();
      history.push(nextLocation.pathname);
    }
  };

  const onConfirm = () => {
    navigateToNextLocation();
  };

  const onCancel = () => {
    setOpenModal(false);
    setNextLocation(null);
  };

  return (
    <div>
      {children(openModal, onConfirm, onCancel)}
    </div>
  );
};

NavigationPrompt.propTypes = {
  when: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired,
};

export default NavigationPrompt;
