import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'semantic-ui-react';
import { uniqueId } from 'lodash';

import './styles.scss';

const generateID = (prefix = 'comp_') => uniqueId(prefix);

const TruncateText = (props) => {
  const { textValue, length, popup } = props;
  if (textValue && textValue.length > length) {
    return (
      <Popup
        trigger={(
          <div className="truncate-text">
            <span className="text">{`${textValue.substring(0, length)}...`}</span>
          </div>
        )}
        content={textValue}
        size="mini"
        disabled={!popup}
      />
    );
  }
  return (
    <div className="truncate-text">
      <span className="truncate" key={generateID()}>{textValue}</span>
    </div>
  );
};

TruncateText.propTypes = {
  textValue: PropTypes.string,
  length: PropTypes.number,
  popup: PropTypes.bool,
};

TruncateText.defaultProps = {
  textValue: '',
  length: 10,
  popup: true,
};

export default TruncateText;
