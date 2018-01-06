import { sizeMe } from 'react-sizeme';
import React, {Component} from 'react';
import * as THREE from 'three';

import Robot from '../models/Robot';
import World from './World';

class DashboardScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cube: {
        position: new THREE.Vector3(0, 1, 0),
        rotation: new THREE.Euler(),
      }
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

  renderCube = () => {
    return (
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
    );
  }

  render() {
    return (
      <div style={{height: '100%', width: '100%'}} ref="canvas">
        <World onAnimate={this.onAnimate} objects={<Robot/>} {...this.props} canvasDOM={this.refs.canvas}/>
      </div>
    );
  }
}

export default sizeMe({monitorHeight:true})(DashboardScene);
