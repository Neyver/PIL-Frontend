import React, { useState } from 'react';
import { Button, Input, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './styles.scss';

const InputButtonGroup = ({ id, setTypePrice, label }) => {
  const [currentValue, setCurrentValue] = useState("0");

  const changeInput = (event, data, type) => {
    const valueNum = parseFloat(data.value);
    if (Number.isNaN(valueNum) || valueNum <= 0) {
      setCurrentValue('');
    } else {
      setCurrentValue(valueNum);
      if (type) {
        setTypePrice({ id: id, percentage: valueNum });
      }
    }
  };

  const handleChangeMinus = () => {
    if (currentValue > 1) {
      const minus = currentValue - 1;
      changeInput({}, { value: minus }, 'type');
    }
  };

  const handleChangePlus = () => {
    const plus = currentValue + 1;
    changeInput({}, { value: plus }, 'type');
  };

  const onBlurChange = (event) => {
    changeInput({}, { value: event.target.value }, 'type')
  };

  return (
    <span className="input-group">
      {label && <Header as='h5' className="custom-label">{label}</Header>}
      <div>
        <Button size="mini" icon="minus" circular onClick={() => handleChangeMinus()} />
        <Input
          type="tex"
          value={currentValue}
          onChange={changeInput}
          size="mini"
          className="custom-input"
          onBlur={onBlurChange}
        />
        <Button size="mini" icon="plus" circular onClick={() => handleChangePlus()} />
      </div>
    </span>
  );
};

InputButtonGroup.propTypes = {
  id: PropTypes.string.isRequired,
  setTypePrice: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default InputButtonGroup;
