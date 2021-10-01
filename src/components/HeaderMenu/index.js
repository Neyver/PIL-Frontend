import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Divider, Dropdown, Image, Menu, Popup,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/images/logo-blue.png';
import './styles.scss';

/**
 * @param {array} options array of Button.propTypes
 * generate a menu with page options
 * @returns {*} array of menu items from semantic
 */
export const buildOptions = options => options.map((item) => {
  // eslint-disable-next-line no-restricted-globals
  const path = location.pathname;
  const itemProps = { ...item };
  delete itemProps.routerPath;
  return (
    <Menu.Item
      key={item.routerPath}
      name={item.label}
      as={Link}
      to={item.routerPath}
      active={path.includes(item.routerPath)}
      onClick={item.onClick}
      icon={item.icon}
      {...itemProps}
    />
  );
});

/**
 *  render a menu with page option, user data
 * @param {HeaderMenu.propTypes } props define the current data to render
 * @returns {*} return a react component
 */
function HeaderMenu(props) {
  const {
    userOptions, userData, pageOptions,
  } = props;
  const [imageError, setImageError] = useState(false);
  const { imageSrc, user } = userData;

  const onError = () => setImageError(true);

  return (
    <Menu borderless fluid className="header-menu" inverted>
      <Menu.Menu key="logo" className="logo-menu">
        <Menu.Item>
          <Image src={Logo} size='tiny' />
        </Menu.Item>
      </Menu.Menu>
      <Menu.Menu key="pages" className="options-items">
        {buildOptions(pageOptions)}
      </Menu.Menu>
      <Menu.Menu key="userOptions" className="options-user">
        <Menu.Item icon="bell outline" size="large" className="icon-menu" />
        <Popup
          hoverable
          trigger={
            imageSrc && !imageError ? (
              <Menu.Item icon className="user-image">
                <Image
                  src={imageSrc}
                  avatar
                  onError={onError}
                />
              </Menu.Item>
            )
              : (<Menu.Item icon="user circle outline" className="icon-menu" />)
          }
          content={(
            <Menu vertical text>
              <Menu.Item content={user} active />
              <Divider />
              {userOptions.map((item, key) => (
                <Menu.Item
                  key={`${item.text}-${key.toString()}`}
                  {...item}
                  text={""}
                />
              ))}
            </Menu>
          )}
        />
      </Menu.Menu>
    </Menu>
  );
}

export const user = {
  name: PropTypes.string,
  imageSrc: PropTypes.string,
};

HeaderMenu.propTypes = {
  pageOptions: PropTypes.arrayOf(PropTypes.shape(Button.propTypes)),
  userOptions: PropTypes.arrayOf(PropTypes.shape(Dropdown.Item.propTypes)),
  userData: PropTypes.shape(user),
};

HeaderMenu.defaultProps = {
  pageOptions: [],
  userOptions: [],
  userData: {
    name: '',
    imageSrc: '',
  },
};

export default HeaderMenu;
