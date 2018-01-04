import React, {Component} from 'react';
import React3 from 'react-three-renderer';
import * as THREE from 'three';

class DashboardScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraPosition: new THREE.Vector3(0, 0, 5),
      cubeRotation: new THREE.Euler(),
      fog: new THREE.Fog("#000000", 1, 8),
      background: new THREE.Color(0xDDDDDD)
    }
  }

  onAnimate = () => {
    this.setState({
      cubeRotation: new THREE.Euler(
        this.state.cubeRotation.x + 0.01,
        0.5,
        0
      ),
    });
  };

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
      >
        <scene fog={this.state.fog}>
          <perspectiveCamera
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={this.state.cameraPosition}
          />
          <mesh
            rotation={this.state.cubeRotation}
          >
            <boxGeometry
              width={1}
              height={1}
              depth={1}
            />
            <meshBasicMaterial
              color={"#39ff88"}
            />
          </mesh>
        </scene>
      </React3>
    );
  }
}

export default DashboardScene;
