import React from 'react';
import * as THREE from 'three';

import PropTypes from 'prop-types';

const RobotArmCylinder = props => {
  const position = props.position || new THREE.Vector3(props.length / 2, 0, 0);
  const rotation = props.rotation || new THREE.Euler(0, 0, THREE.Math.degToRad(-90));
  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry
        radiusTop={props.radius}
        radiusBottom={props.radius}
        height={props.length}
        radialSegments={32}
      />
      <meshStandardMaterial color={props.color}/>
    </mesh>
  );
}

RobotArmCylinder.propTypes = {
  position: PropTypes.instanceOf(THREE.Vector3),
  rotation: PropTypes.instanceOf(THREE.Euler),
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(THREE.Color)
  ]),
  radius: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired
}

export default RobotArmCylinder;
