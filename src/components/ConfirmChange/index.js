import React from 'react';
import {
  Grid, Icon, Modal, Segment, Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './styles.scss';

const ConfirmMessage = (title, message, icon) => (
  <Segment basic className="confirm-body-content">
    <Header as="h3">{title}</Header>
    <Grid padded verticalAlign="middle" columns={2}>
      <Grid.Column width={14}>
        <span>{message}</span>
      </Grid.Column>
      <Grid.Column width={2}>
        {icon || <Icon name="exclamation triangle" size="small" />}
      </Grid.Column>
    </Grid>
  </Segment>
);

const ConfirmChange = (props) => {
  const {
    open, onConfirm, icon, onCancel, message, confirm, cancel, confirmHeader, className, ...leftoverProps
  } = props;
  return (
    <Modal
      closeOnDimmerClick={false}
      content={ConfirmMessage(confirmHeader, message, icon)}
      className={`confirm-change-modal${className ? ` ${className}` : ''}`}
      size="tiny"
      actions={[
        {
          key: 'no',
          content: cancel,
          onClick: onCancel,
          size: 'tiny',
        },
        {
          key: 'yes',
          content: confirm,
          onClick: onConfirm,
          primary: true,
          size: 'tiny',
        },
      ]}
      open={open}
      {...leftoverProps}
    />
  );
};

ConfirmChange.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  icon: PropTypes.node,
  message: PropTypes.string,
  confirm: PropTypes.string,
  cancel: PropTypes.string,
  confirmHeader: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

ConfirmChange.defaultProps = {
  open: false,
  onCancel: () => {},
  onConfirm: () => {},
  message: 'The data entered will be discarded.',
  confirm: 'Yes',
  cancel: 'No',
  confirmHeader: 'Do you wish to cancel the operation?',
  className: '',
};

export default ConfirmChange;
