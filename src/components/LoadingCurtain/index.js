import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * Load curtain component covers the entire container that uses it.
 * @namespace LoadingCurtain
 * @memberof client/components
 * @param {*} props props
 */

const LoadingCurtain = (props) => {
  const { loading, message } = props;
  return (
    <Dimmer active={loading} inverted>
      <Loader content={message} />
    </Dimmer>
  );
};

LoadingCurtain.propTypes = {
  loading: PropTypes.bool,
  message: PropTypes.string,
};

LoadingCurtain.defaultProps = {
  message: 'Loading...',
  loading: false,
};

export default LoadingCurtain;
