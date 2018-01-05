import React, {Component} from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

import Field from '../models/Field';
import ThreeAxisArrows from '../helpers/ThreeAxisArrows';

const OrbitControls = require('three-orbit-controls')(THREE);

const styles = {
  distantPlace: {
    color: new THREE.Color("#DDDDDD"),
    fogDensity: 0.0125
  }
}

class DashboardScene extends Component {
  constructor(props) {
    super(props);
    const origin = new THREE.Vector3(0, 0, 0);
    this.state = {
      origin: origin,
      camera: {
        position: new THREE.Vector3(0, 0, 5),
        lookAt: origin,
      },
      arrows: {
        origin: origin,
        length: 10,
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
      },
      spotLight: {
        position: new THREE.Vector3(0, 100, 0),
        lookAt: origin,
        penumbra: 0.5
      },
      cube: {
        position: new THREE.Vector3(0, 1, 0),
        rotation: new THREE.Euler(),
      },
      fog: new THREE.FogExp2(styles.distantPlace.color, styles.distantPlace.fogDensity),
      background: styles.distantPlace.color
    }
  }

  onAnimate = () => {
    this.setState({
      cube: {
        position: this.state.cube.position,
        rotation: new THREE.Euler(
          this.state.cube.rotation.x + 0.01,
          0.5,
          0
        ),
      }
    });
  };

  componentDidMount() {
    const controls = new OrbitControls(this.refs.camera);
    this.controls = controls;
  }

  componentWillUnmount() {
    this.controls.dispose();
    delete this.controls;
  }

  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return (
      <React3
        mainCamera="camera"
        width={width}
        height={height}
        onAnimate={this.onAnimate}
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
            position={this.state.camera.position}
            lookAt={this.state.camera.lookAt}
          />
          <gridHelper size={200} step={50} />
          <axisHelper size={1000} />
          <ThreeAxisArrows origin={this.state.origin} length={this.state.arrows.length}/>
          <spotLight
            penumbra={this.state.spotLight.penumbra}
            position={this.state.spotLight.position}
            lookAt={this.state.spotLight.lookAt}
          />
          <Field width={1000} height={1000} color={"#5e5e5e"}/>
          <mesh
            rotation={this.state.cube.rotation}
            position={this.state.cube.position}
          >
            <boxGeometry
              width={1}
              height={1}
              depth={1}
            />
            <meshStandardMaterial
              color={"#39ff88"}
            />
          </mesh>
        </scene>
      </React3>
    );
  }
}

export default DashboardScene;
