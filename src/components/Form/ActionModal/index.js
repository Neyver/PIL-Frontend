import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import ActionForm from '../ActionForm';

const ActionModal = (props) => {
  const {
    onSubmit, onCancel, initialValues, validationSchema, initialErrors, children, cancel, submit, openForm, title,
    className, validateOnChange, validateOnBlur,
  } = props;

  return (
    <Modal
      open={openForm}
      closeOnEscape={false}
      closeOnDimmerClick={false}
      size="tiny"
      className={className}
    >
      <Modal.Content>
        <Segment basic>
          {title}
          <ActionForm
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onCancel={onCancel}
            initialErrors={initialErrors}
            cancel={cancel}
            submit={submit}
            validateOnBlur={validateOnBlur}
            validateOnChange={validateOnChange}
            withRoute={false}
          >
            {children}
          </ActionForm>
        </Segment>
      </Modal.Content>
    </Modal>
  );
};

ActionModal.defaultProps = {
  initialValues: {},
  validationSchema: {},
  onSubmit: () => {},
  onCancel: () => {},
  initialErrors: {},
  cancel: 'Cancel',
  submit: 'Save',
  openForm: false,
  validateOnBlur: true,
  validateOnChange: false,
};

ActionModal.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  initialErrors: PropTypes.shape({}),
  initialValues: PropTypes.shape({}),
  validationSchema: PropTypes.func,
  children: PropTypes.node,
  cancel: PropTypes.string,
  submit: PropTypes.string,
  openForm: PropTypes.bool,
  title: PropTypes.node,
  className: PropTypes.string,
  validateOnChange: PropTypes.bool,
  validateOnBlur: PropTypes.bool,
};

export default ActionModal;
