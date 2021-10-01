import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ActionForm from '../../../../components/Form/ActionForm';
import { ModalManager } from '../../../../components/ModalProvider';
import { productActions } from '../../../../store/actions';
import { defaultDiscardObject } from '../../../../helpers';
import FromChangePrice, { validationSchema, initialErrors } from '../FromChangePrice';
import './styles.scss';

const FormModalChangePrice = (props) => {
  const {
    initialValues, productActs, modalKey,
  } = props;

  const handleCancel = () => {
    ModalManager.closeModal(modalKey);
  };

  const handleSave = (data) => {
    productActs.requestPostByPorcentaje(data);
  };

  return (
    <div className="form-file">
      <Segment basic className="fields-access">
        <Segment basic>
          <Segment basic className="title-form">
            <Header as="h3">Cambiar el porcentaje</Header>
          </Segment>
          <ActionForm
            onSubmit={handleSave}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onCancel={handleCancel}
            initialErrors={initialErrors}
            cancel="Cancelar"
            submit="Aceptar"
            confirmMessageProps={defaultDiscardObject}
            withRoute={false}
            validateOnBlur
            validateOnChange={false}
          >
            <FromChangePrice />
          </ActionForm>
        </Segment>
      </Segment>
    </div>
  );
};

FormModalChangePrice.propTypes = {
  initialValues: PropTypes.shape({}),
  productActs: PropTypes.shape({}),
  modalKey: PropTypes.string,
};

const mapStateToProps = () => {
};

const mapDispatchToProps = dispatch => (
  {
    productActs: bindActionCreators(productActions, dispatch),
  }
);

const withCompose = compose(
  connect(mapStateToProps, mapDispatchToProps)
);

export default withCompose(FormModalChangePrice);