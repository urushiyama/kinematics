import { AppBar, Toolbar, Typography } from 'material-ui';
import React from 'react';

import PropTypes from 'prop-types';

const NavigationBar = props => {
  return (
    <div>
      <AppBar position="fixed" color="default">
        <Toolbar>
          <Typography type="title">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{height: 64}}/>
    </div>
  );
}

NavigationBar.propTypes = {
  title: PropTypes.string.isRequired
}

export default NavigationBar;
