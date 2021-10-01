import React, { useState } from 'react';

import debounce from 'lodash/debounce';
import {
  Button, Form, Segment,
} from 'semantic-ui-react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import NavigationPrompt from '../../NavigationPrompt';
import ConfirmChange from '../../ConfirmChange';
import './styles.scss';

const DEBOUNCE_TIME = 300;
const ActionForm = (props) => {
  const {
    onSubmit, onCancel, initialValues, validationSchema, initialErrors, children, cancel, submit,
    validateOnBlur, validateOnChange, disabledButton, withRoute, confirmMessageProps, defaultSubmit,
  } = props;

  const [stateErrors, setStateErrors] = useState(initialErrors);
  const [openConfirm, setOpenConfirm] = useState(false);

  const setStateError = (field, value) => {
    const newState = stateErrors.set(field, value);
    setStateErrors(newState);
  };

  const doDebouncedAction = debounce(onSubmit, DEBOUNCE_TIME);

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(initialValues)}
        enableReinitialize
        validateOnBlur={validateOnBlur}
        validateOnChange={validateOnChange}
        onSubmit={doDebouncedAction}
        render={(propsForm) => {
          const {
            errors, values, handleChange, setFieldValue, handleBlur,
            isSubmitting, dirty, setFieldTouched, submitForm, setFieldError,
          } = propsForm;

          if (isSubmitting) {
            const newState = stateErrors.map(() => true);
            setStateErrors(newState);
          }

          const handleCancel = () => {
            if (!withRoute && dirty) {
              setOpenConfirm(true);
            } else {
              onCancel();
            }
          };

          const handleSubmit = (event) => {
            event.preventDefault();
            submitForm();
          };

          const onKeyPress = (event) => {
            if (defaultSubmit && event.charCode === 13) return;
            if (event.charCode === 13) {
              handleSubmit(event);
            }
          };

          return (
            <Form noValidate onKeyPress={onKeyPress}>
              {
                withRoute
                  ? (
                    <NavigationPrompt when={dirty && !isSubmitting}>
                      {(isOpen, onConfirm, onCancelConfirm) => (
                        <ConfirmChange
                          open={isOpen}
                          onConfirm={onConfirm}
                          onCancel={onCancelConfirm}
                          {...confirmMessageProps}
                        />
                      )}
                    </NavigationPrompt>
                  ) : (
                    <ConfirmChange
                      open={openConfirm}
                      onConfirm={() => { onCancel(); setOpenConfirm(false); }}
                      onCancel={() => { setOpenConfirm(false); }}
                      {...confirmMessageProps}
                    />
                  )
              }
              {React.cloneElement(children, {
                setStateError,
                errors,
                stateErrors,
                values,
                handleChange,
                setFieldValue,
                handleBlur,
                setFieldTouched,
                setFieldError,
                handleCancel,
                handleSubmit,
                setOpenConfirm,
              })}
              <Segment basic className="actions-form">
                {cancel && (
                  <Button
                    size="big"
                    onClick={handleCancel}
                    className="button-cancel"
                  >
                    {cancel}
                  </Button>
                )}
                {submit && (
                  <Button
                    primary
                    size="big"
                    type="submit"
                    className="button-save"
                    onClick={handleSubmit}
                    disabled={disabledButton || isSubmitting}
                    loading={isSubmitting}
                  >
                    {submit}
                  </Button>
                )}
              </Segment>
            </Form>
          );
        }}
      />
    </React.Fragment>
  );
};

ActionForm.defaultProps = {
  initialValues: {},
  validationSchema: () => { },
  onSubmit: () => { },
  onCancel: () => { },
  initialErrors: {},
  cancel: '',
  submit: '',
  disabledButton: false,
  validateOnBlur: true,
  validateOnChange: false,
  withRoute: true,
  defaultSubmit: false,
};

ActionForm.propTypes = {
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  initialErrors: PropTypes.shape({}),
  initialValues: PropTypes.shape({}),
  validationSchema: PropTypes.func,
  children: PropTypes.node,
  cancel: PropTypes.string,
  submit: PropTypes.string,
  disabledButton: PropTypes.bool,
  validateOnBlur: PropTypes.bool,
  validateOnChange: PropTypes.bool,
  withRoute: PropTypes.bool,
  confirmMessageProps: PropTypes.shape(ConfirmChange.propTypes),
  defaultSubmit: PropTypes.bool,
};

export default ActionForm;
