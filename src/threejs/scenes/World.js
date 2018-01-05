import { sizeMe } from 'react-sizeme';
import React, {Component} from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import PropTypes from 'prop-types';

import Field from '../models/Field';
import ThreeAxisArrows from '../helpers/ThreeAxisArrows';

const OrbitControls = require('three-orbit-controls')(THREE);

const styles = {
  distantPlace: {
    color: new THREE.Color("#DDDDDD"),
    fogDensity: 0.0125
  }
}

class World extends Component {
  constructor(props) {
    super(props);
    const origin = new THREE.Vector3(0, 0, 0);
    this.state = {
      origin: origin,
      camera: {
        position: new THREE.Vector3(5, 5, 5), // overriden by OrbitControls
        lookAt: origin,
      },
      spotLight: {
        position: new THREE.Vector3(0, 100, 0),
        lookAt: origin,
        penumbra: 0.5
      },
      arrows: {
        length: 10
      },
      fog: new THREE.FogExp2(styles.distantPlace.color, styles.distantPlace.fogDensity),
      background: styles.distantPlace.color
    }
  }

  componentDidMount() {
    const controls = new OrbitControls(this.refs.camera);
    this.controls = controls;
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;
  }

  render() {
    const width = this.props.size.width;
    const height = this.props.size.height;
    console.dir(this.props.size);
    const arrowsLength = (this.controls !== undefined)
      ? this.controls.object.position.distanceTo(this.state.origin) / 5
      : 1;
    return (
      <React3
        mainCamera="camera"
        width={width}
        height={height}
        onAnimate={this.props.onAnimate}
        clearColor={this.state.background}
        pixelRatio={window.devicePixelRatio}
      >
        <scene fog={this.state.fog}>
          <perspectiveCamera
            ref="camera"
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            {...this.state.camera}
          />
          <gridHelper size={200} step={50} />
          <axisHelper size={1000} />
          <ThreeAxisArrows origin={this.state.origin} length={arrowsLength} />
          <spotLight {...this.state.spotLight} />
          <Field width={1000} height={1000} color={"#5e5e5e"} />
          {this.props.objects}
        </scene>
      </React3>
    );
  }
}

World.propTypes = {
  onAnimate: PropTypes.func,
  objects: PropTypes.element.isRequired,
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  })
}

export default World;
