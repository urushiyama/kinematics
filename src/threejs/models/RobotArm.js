import React from 'react';
import * as THREE from 'three';

import PropTypes from 'prop-types';

import Joint from './Joint';
import ThreeAxisArrows from '../helpers/ThreeAxisArrows';

const RobotArm = props => {
  const basePosition = props.basePosition || new THREE.Vector3(0, 0, props.length / 2);
  const baseRotation = props.baseRotation || new THREE.Euler(THREE.Math.degToRad(90), 0, 0);
  const position = props.position || new THREE.Vector3();
  return (
    <group position={props.origin.position} rotation={props.origin.rotation}>
      <group position={position} rotation={props.rotation}>
        <mesh position={basePosition} rotation={baseRotation}>
          <cylinderGeometry
            radiusTop={props.radius}
            radiusBottom={props.radius}
            height={props.length}
            radialSegments={32}
          />
          <meshStandardMaterial color={props.color}/>
        </mesh>
        <ThreeAxisArrows length={20} visible/>
        {props.children}
      </group>
    </group>
  );
}

RobotArm.propTypes = {
  position: PropTypes.instanceOf(THREE.Vector3),
  rotation: PropTypes.instanceOf(THREE.Euler),
  origin: PropTypes.shape({
    position: PropTypes.instanceOf(THREE.Vector3),
    rotation: PropTypes.instanceOf(THREE.Euler)
  }),
  radius: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(THREE.Color)
  ]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}

export default RobotArm;
