import React from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

const arrows = {
  x: {
    direction: new THREE.Vector3(1, 0, 0),
    color: "#FF0000"
  },
  y: {
    direction: new THREE.Vector3(0, 1, 0),
    color: "#00FF00"
  },
  z: {
    direction: new THREE.Vector3(0, 0, 1),
    color: "#0000FF"
  }
}

const ThreeAxisArrows = props => {
  return (
    <group visible={props.visible}>
      <arrowHelper origin={props.origin} length={props.length} dir={arrows.x.direction} color={arrows.x.color}/>
      <arrowHelper origin={props.origin} length={props.length} dir={arrows.y.direction} color={arrows.y.color}/>
      <arrowHelper origin={props.origin} length={props.length} dir={arrows.z.direction} color={arrows.z.color}/>
    </group>
  );
}

ThreeAxisArrows.defaultProps = {
  origin: new THREE.Vector3(0, 0, 0),
  length: 1,
  visible: false
}

ThreeAxisArrows.propTypes = {
  origin: PropTypes.instanceOf(THREE.Vector3),
  length: PropTypes.number,
  visible: PropTypes.bool
}

export default ThreeAxisArrows;
