import React from 'react';
import PropTypes from 'prop-types';
import * as THREE from 'three';

const Field = props => {
  const segments = props.width / 10 + 1;
  const baseRotation = new THREE.Euler(THREE.Math.degToRad(-90),0,0);
  return (
    <mesh rotation={baseRotation}>
      <planeGeometry width={props.width} height={props.height} widthSegments={segments} heightSegments={segments}/>
      <meshStandardMaterial color={props.color}/>
    </mesh>
  );
}

Field.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(THREE.Color)
  ])
}

export default Field;
