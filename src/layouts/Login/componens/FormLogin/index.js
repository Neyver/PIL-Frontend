import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Segment } from 'semantic-ui-react';
import { fromJS, Map } from 'immutable';

import {
  required,
} from '../../../../helpers/FormValidators';
import CustomInput from '../../../../components/CustomInput';
import './styles.scss';

export const validationSchema = initialValues => (Yup.object().shape({
  username: Yup.string(),
  password: Yup.string()
}));

export const initialErrors = fromJS({
  username: false,
  password: false,
});

const FormClearance = (props) => {
  const {
    values, stateErrors, errors, handleChange, setStateError, handleBlur,
    setFieldError,
  } = props;

  return (
    <Segment basic className='form-login'>
      <CustomInput
        name="username"
        placeholder='Usuario'
        value={values.username}
        onChange={handleChange}
        setStateError={setStateError}
        stateError={stateErrors.get('username')}
        errorMessage={errors.username}
        autoFocus
        handleBlur={handleBlur}
        setFieldError={setFieldError}
        icon='user'
        iconPosition='left'
      />
      <CustomInput
        name="password"
        placeholder='Contraseña'
        value={values.password}
        onChange={handleChange}
        setStateError={setStateError}
        stateError={stateErrors.get('password')}
        errorMessage={errors.password}
        handleBlur={handleBlur}
        setFieldError={setFieldError}
        type="password"
        icon='lock'
        iconPosition='left'
      />
    </Segment>
  );
};

FormClearance.propTypes = {
  initialValues: PropTypes.shape({}),
  values: PropTypes.shape({}),
  stateErrors: PropTypes.instanceOf(Map),
  handleChange: PropTypes.func,
  setStateError: PropTypes.func,
  errors: PropTypes.shape({}),
  handleBlur: PropTypes.func,
  setFieldError: PropTypes.func,
  title: PropTypes.node,
};

export default FormClearance;