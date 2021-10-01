import React from 'react';
import { Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import { fromJS } from 'immutable';

export const initialErrors = fromJS({
});

export const validationSchema = initialValues => (Yup.object().shape({
}));

const FormAccessPoint = (props) => {
  const {
  } = props;

  return (
    <Segment basic className="form-file-choose">
      <span>¿Esta seguro de cambiar precios con el porcentaje ingresado?</span>;
    </Segment>
  );
};

FormAccessPoint.propTypes = {};

export default FormAccessPoint;
