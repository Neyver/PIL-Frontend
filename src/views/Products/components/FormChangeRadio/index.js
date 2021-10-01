import React from 'react';
import { Segment } from 'semantic-ui-react';
import * as Yup from 'yup';
import { fromJS } from 'immutable';

export const initialErrors = fromJS({
});

export const validationSchema = initialValues => (Yup.object().shape({
}));

const FormChangeRadio = (props) => {
  const {
  } = props;

  return (
    <Segment basic className="form-file-choose">
      <span>¿Esta seguro de cambiar de categoria?</span>;
    </Segment>
  );
};

FormChangeRadio.propTypes = {};

export default FormChangeRadio;
