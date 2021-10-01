import React, { useState, useEffect } from 'react';
import { Radio } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './styles.scss';

const SelectRadio = ({ value, percentage, checked, onChange }) => {
  const [chek, setChecked] = useState(checked);

  useEffect(() => {
    setChecked(checked);
  }, [checked]);

  return (
    <div>
      {value && <label className={classNames({ 'customo-radio-item': chek })}>{value}</label>}
      <Radio
        label={`+${percentage}%`}
        onChange={onChange}
        checked={chek}
        className={`customo-radio-item-one ${classNames({ 'customo-radio-item': chek })}`}
      />
    </div>
  )
};

SelectRadio.defaultProps = {
  checked: false,
  percentage: 0,
};

SelectRadio.propTypes = {
  value: PropTypes.string,
  percentage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default SelectRadio;
