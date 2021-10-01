import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ActionForm from '../../../../components/Form/ActionForm';
import { ModalManager } from '../../../../components/ModalProvider';
import { productActions } from '../../../../store/actions';
import { defaultDiscardObject } from '../../../../helpers';
import FormChangeRadio, { validationSchema, initialErrors } from '../FormChangeRadio';

const FormModalChangePrice = (props) => {
  const {
    initialValues, productActs, modalKey,
  } = props;

  const handleCancel = () => {
    ModalManager.closeModal(modalKey);
  };

  const handleSave = (data) => {
    productActs.createPriceByCheck(data.id, data.products, data.currentListPrice);
  };

  return (
    <div className="form-file">
      <Segment basic className="fields-access">
        <Segment basic>
          <Segment basic className="title-form">
            <Header as="h3">Cambiar la Categoria</Header>
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
            <FormChangeRadio />
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
