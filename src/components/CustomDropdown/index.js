import React from 'react';
import {
  Dropdown,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import './styles.scss';

const CustomDropdown = (props) => {
  const {
    value, options, nameIcon, className, circular, text, onClick: onClickDropdown,
    direction, icon, secondaryOptions, ...leftOverProps
  } = props;

  const getOptions = data => data.map((option) => {
    const {
      content, key, onClick = () => {}, disable,
    } = option;
    return (!disable
        && (
          <Dropdown.Item
            key={key}
            disabled={disable}
            onClick={() => onClick(value)}
          >
            {(typeof content === 'function') ? content(value) : content}
          </Dropdown.Item>
        )
    );
  });

  const buttonClassName = {
    'circular-button': circular,
  };

  buttonClassName[`${className}`] = true;

  return (
    <div className="ellipsis-button-dropdown">
      <Dropdown
        icon={icon ? nameIcon : null}
        button
        className={classNames({ icon, ...buttonClassName })}
        text={String(text) || ''}
        data-testid="ellipsis-button"
        onClick={onClickDropdown}
        {...leftOverProps}
      >
        <Dropdown.Menu direction={direction} className="dropdown-menu">
          {options.length > 0
          && getOptions(options)
          }
          {
            secondaryOptions.length > 0
            && (
              <React.Fragment>
                <Dropdown.Divider />
                {
                  getOptions(secondaryOptions)
                }
              </React.Fragment>
            )
          }
        </Dropdown.Menu>

      </Dropdown>
    </div>
  );
};

CustomDropdown.defaultProps = {
  options: [],
  secondaryOptions: [],
  circular: false,
  disabled: false,
  icon: true,
  text: '',
  nameIcon: 'ellipsis vertical',
  onClick: () => {},
};

CustomDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.func,
    ]),
    disable: PropTypes.bool,
    onClick: PropTypes.func,
  })),
  secondaryOptions: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.node,
    disable: PropTypes.bool,
    onClick: PropTypes.func,
  })),
  value: PropTypes.shape({
    id: PropTypes.string,
  }),
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  className: PropTypes.string,
  circular: PropTypes.bool,
  disabled: PropTypes.bool,
  icon: PropTypes.bool,
  nameIcon: PropTypes.string,
  direction: PropTypes.string,
  onClick: PropTypes.func,
};

export default CustomDropdown;
