import React from 'react';
import * as THREE from 'three';

import PropTypes from 'prop-types';

const Joint = props => {
  return (
    <mesh>
      <sphereGeometry radius={props.radius} widthSegments={32} heightSegments={32}/>
      <meshStandardMaterial color={props.color}/>
    </mesh>
  );
}

Joint.propTypes = {
  radius: PropTypes.number.isRequired,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(THREE.Color)
  ]).isRequired
}

export default Joint;
