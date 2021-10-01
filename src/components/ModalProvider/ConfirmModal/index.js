import React from 'react';
import { Grid, Icon, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './styles.scss';

const ConfirmModal = (props) => {
  const {
    actions, title, message, icon,
  } = props;

  return (
    <React.Fragment>
      <Modal.Header className="confirm-modal-header">
        {title}
      </Modal.Header>
      <Modal.Content className="confirm-modal-body">
        <Grid padded verticalAlign="middle" columns={2}>
          <Grid.Column width={14}>
            {message}
          </Grid.Column>
          <Grid.Column width={2}>
            {icon || <Icon name="warning sign" size="huge" />}
          </Grid.Column>
        </Grid>
      </Modal.Content>
      <Modal.Actions
        className="confirm-modal-actions"
        actions={actions}
      >
      </Modal.Actions>
    </React.Fragment>
  );
};

ConfirmModal.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
  title: PropTypes.node,
  icon: PropTypes.node,
  message: PropTypes.node,
};

export default ConfirmModal;
