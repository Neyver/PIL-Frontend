import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Segment, Sidebar, Menu, Icon,
} from 'semantic-ui-react';

import './styles.scss';

const ContainerView = (props) => {
  const {
    leftPanel, centerPanel,
  } = props;
  const [visible, setVisible] = useState(true);

  return (
    <Segment.Group className="container-view" horizontal>
      <Segment className="view-center" style={{ background: centerPanel.color }}>
        <Sidebar.Pushable className="side-bar-panel-center">
          <Sidebar
            as={Menu}
            animation={window.innerWidth <= 700 ? "overlay" : "push"}
            icon="labeled"
            direction='left'
            inverted
            vertical
            visible={visible}
            width="wide"
            style={{ background: leftPanel.color }}
          >
            <Icon className="close-panel" name="close" onClick={() => setVisible(false)} />
            {visible && leftPanel.component}
          </Sidebar>

          <Sidebar.Pusher>
            <Segment basic className={visible ? "view-center-small" : "view-center-1440px"}>
              {centerPanel.component}
              {(window.innerWidth <= 700 || !visible) && <div className="panel-1440px">
                <Icon link name="angle double right" size="large" onClick={() => setVisible(true)} />
              </div>}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Segment>
    </Segment.Group >
  );
};

ContainerView.propTypes = {
  leftPanel: PropTypes.shape({
    component: PropTypes.node,
    color: PropTypes.string,
  }),
  centerPanel: PropTypes.shape({
    component: PropTypes.node,
    color: PropTypes.string,
  }),
};

ContainerView.defaultProps = {
  leftPanel: {
    component: undefined,
    color: 'gray',
  },
  centerPanel: {
    component: undefined,
    color: 'white',
  },
};

ContainerView.ScreenSize = {
  RESPONSIVE: 1440,
  MAXIMUM: 1740,
  NORMAL: 1600,
  MINIMUM: 1210,
};

export default ContainerView;
