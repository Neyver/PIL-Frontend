import React from 'react';
import { Icon, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const EmptyMessage = (props) => {
  const {
    title, subtitle, nameIcon, loading
  } = props;
  return (
    (<Message icon>
      <Message.Content>
        <Icon name={nameIcon} loading={loading} />
        <Message.Header>{title}</Message.Header>
        {subtitle}
      </Message.Content>
    </Message>)
  );
};

EmptyMessage.defaultProps = {
  nameIcon: 'arrow alternate circle right',
  loading: true,
};

EmptyMessage.propTypes = {
  nameIcon: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  loading: PropTypes.bool,
};

export default EmptyMessage;
