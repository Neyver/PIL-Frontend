import React, { useState, useEffect } from 'react';
import { Form, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './styles.scss';

const CustomInput = (props) => {
  const {
    name, label, type, errorMessage, stateError, value, handleChange, setStateError, disabled,
    required, handleBlur, inputProps, setFieldError, placeholder, icon, iconPosition, ...nextProps
  } = props;

  const [currentValue, setCurrentValue] = useState(value);

  const onFocus = () => {
    setFieldError(name, '');
    setStateError(name, false);
  };

  const handleOnBlur = () => {
    setFieldError(name, '');
    setStateError(name, true);
  };

  const handleChangeDefault = (env) => {
    setCurrentValue(env.currentTarget.value);
    handleChange(env, env.currentTarget.value);
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <Form.Field
      className="custom-input"
      error={Boolean(stateError && errorMessage)}
      disabled={disabled}
      required={required}
      onFocus={onFocus}
      onBlur={handleOnBlur}
      {...nextProps}
    >
      <label htmlFor={name}>{label}</label>
      <Input
        type={type}
        name={name}
        onBlur={handleBlur}
        autoComplete="off"
        value={currentValue}
        onChange={handleChangeDefault}
        placeholder={placeholder}
        disabled={disabled}
        icon={icon}
        iconPosition={iconPosition}
        {...inputProps}
      />
      <label htmlFor={name} className="error-message">
        {stateError && errorMessage ? errorMessage : '\u00A0'}
      </label>
    </Form.Field>
  );
};

CustomInput.defaultProps = {
  label: '',
  name: '',
  stateError: false,
  errorMessage: '',
  placeholder: '',
  type: 'text',
  value: '',
  disabled: false,
  required: false,
  inputProps: {},
  handleChange: () => { },
  setStateError: () => { },
  handleBlur: () => { },
  setFieldError: () => { },
};

CustomInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  stateError: PropTypes.bool,
  errorMessage: PropTypes.node,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  inputProps: PropTypes.shape({}),
  handleChange: PropTypes.func,
  setStateError: PropTypes.func,
  handleBlur: PropTypes.func,
  setFieldError: PropTypes.func,
};

export default CustomInput;
