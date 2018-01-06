import React from 'react';

import PropTypes from 'prop-types';

import { withOrigin } from '../wrapper/withOrigin';

const RobotArm = props => {
  return (
    <group position={props.position} rotation={props.rotation}>
      {props.model}
      {props.children}
    </group>
  );
}

RobotArm.propTypes = {
  model: PropTypes.element,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export default withOrigin(RobotArm);
