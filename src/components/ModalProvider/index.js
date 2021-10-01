import React, { useEffect, useState } from 'react';
import { Modal } from 'semantic-ui-react';
import MessageModal from '../ModalProvider/MessageModal';
import ConfirmModal from '../ModalProvider/ConfirmModal';

export const ModalManager = {

  instance: undefined,
  INFO_MODAL_KEY: 'INFO_MODAL_KEY',
  CONFIRM_MODAL_KEY: 'CONFIRM_MODAL_KEY',

  showInfoModal(title, message, onClose = () => { }, open = true, messageProps = {}, modalProps = {}) {
    const handleOnclose = () => {
      ModalManager.closeModal(ModalManager.INFO_MODAL_KEY);
      onClose(ModalManager.INFO_MODAL_KEY);
    };
    const component = (
      <MessageModal
        title={title}
        message={message}
        onClose={handleOnclose}
        messageProps={messageProps}
      />
    );
    ModalManager.registerModal(ModalManager.INFO_MODAL_KEY, open, component, modalProps);
    return ModalManager.INFO_MODAL_KEY;
  },
  showConfirmModal(title, message, actions, open = true, modalProps = {}, icon) {
    const component = (
      <ConfirmModal
        title={title}
        message={message}
        actions={actions}
        icon={icon}
      />
    );
    ModalManager.registerModal(ModalManager.CONFIRM_MODAL_KEY, open, component, modalProps);
    return ModalManager.CONFIRM_MODAL_KEY;
  },

  showCustomModal(key, component, modalProps, open = true) {
    ModalManager.registerModal(key, open, component, modalProps);
  },

  closeModal(key) {
    ModalManager.setOpenModal(key, false);
  },
  openModal(key) {
    ModalManager.setOpenModal(key, true);
  },

  registerModal(key, open, component, propsComponent) {
    const [modals, setModal] = ModalManager.instance;
    const newModals = modals;
    newModals[key] = {
      key, open, component, props: propsComponent,
    };
    setModal(newModals);
  },

  setOpenModal(key, isOpen) {
    const [modals, setModal] = ModalManager.instance;
    const newModals = modals;
    if (newModals[key]) {
      newModals[key].open = isOpen;
    }
    setModal(newModals);
  },
};

const ModalProvider = () => {
  const [modals, setModal] = useState({});

  const updateModals = (newModals) => {
    setModal(Object.assign({}, newModals));
  };

  useEffect(() => {
    ModalManager.instance = [modals, updateModals];
  }, [modals]);

  return (
    <React.Fragment>
      {Object.values(modals)
        .filter(modalData => modalData.open)
        .map(modalData => (
          <Modal key={modalData.key} open {...modalData.props}>
            {modalData.component}
          </Modal>
        ))}
    </React.Fragment>
  );
};

export default ModalProvider;
