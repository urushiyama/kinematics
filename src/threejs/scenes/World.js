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
    fogDensity: 0.00625
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
      background: styles.distantPlace.color,
      controls: null,
      canvasDOM: props.canvasDOM
    }
  }

  // componentDidMount() {
  //   if (this.state.canvasDOM != null && this.refs.camera !== undefined && this.state.controls === null) {
  //     const controls = new OrbitControls(this.refs.camera, this.state.canvasDOM);
  //     this.setState({controls: controls});
  //   }
  // }

  componentWillReceiveProps = nextProps => {
    if (nextProps.canvasDOM != null && this.refs.camera !== undefined && this.state.controls === null) {
      const controls = new OrbitControls(this.refs.camera, nextProps.canvasDOM);
      controls.addEventListener('change', this.updateArrowsLength);
      this.setState({controls: controls});
    }
  }

  componentWillUnmount() {
    if (this.state.controls !== null) {
      this.state.controls.removeEventListener('change', this.updateArrowsLength);
      this.state.controls.dispose();
      delete this.state.controls;
    }
  }

  updateArrowsLength = () => {
    const controls = this.state.controls;
    const length = (controls !== null && controls.object !== undefined)
      ? controls.object.position.distanceTo(this.state.origin) / 5
      : this.state.arrows.length;
    this.setState({arrows: {length: length}});
  }

  render() {
    const width = this.props.size.width;
    const height = this.props.size.height;
    // const controls = this.state.controls;
    // const arrowsLength = (controls !== null && controls.object !== undefined)
    //   ? controls.object.position.distanceTo(this.state.origin) / 5
    //   : 1;
    // if (controls !== null) console.dir(controls.object);
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
          <gridHelper size={1000} step={50} />
          <axisHelper size={1000} />
          <ThreeAxisArrows origin={this.state.origin} length={this.state.arrows.length} visible />
          <spotLight {...this.state.spotLight} />
          <Field width={1000} height={1000} color={"#5e5e5e"} />
          {this.props.children}
        </scene>
      </React3>
    );
  }
}

World.propTypes = {
  onAnimate: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  canvasDOM: PropTypes.any
}

export default World;
