import { sizeMe } from 'react-sizeme';
import React, {Component} from 'react';
import * as THREE from 'three';

import Robot from '../models/Robot';
import World from './World';

class KinematicsScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: null,
      renderIndividually: {
        position: new THREE.Vector3(10, 0, 10),
        rotation: new THREE.Euler()
      },
      renderHierarchically: {
        position: new THREE.Vector3(-10, 0, -10),
        rotation: new THREE.Euler()
      }
    }
  }

  refCanvas = (canvas) => {
    if (this.state.canvas !== null) return;
    this.setState({canvas: canvas});
  }

  render() {
    return (
      <div style={{height: '100%', width: '100%'}} ref={this.refCanvas}>
        <World onAnimate={this.props.onAnimate} {...this.props} canvasDOM={this.state.canvas}>
          <group>
            <group {...this.state.renderIndividually}>
              <Robot
                color={this.props.colors.individually}
                arms={this.props.arms}
                axisArrows={this.props.axisArrows}
                renderIndividually
              />
            </group>
            <group {...this.state.renderHierarchically}>
              <Robot
                color={this.props.colors.hierarchically}
                arms={this.props.arms}
                axisArrows={this.props.axisArrows}
              />
            </group>
          </group>
        </World>
      </div>
    );
  }
}

export default sizeMe({monitorHeight:true})(KinematicsScene);
