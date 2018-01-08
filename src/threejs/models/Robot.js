import React, { Component } from 'react';
import * as THREE from 'three';

import PropTypes from 'prop-types';

import Joint from './Joint';
import RobotArm from './RobotArm';
import RobotArmCylinder from './RobotArmCylinder';

const _initialState = {
  color: "#DDDDDD",
  joint: {
    radius: 0.5
  },
  base: {
    radius: 2,
    length: 4,
    origin: {
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(THREE.Math.degToRad(-90), 0, 0)
    },
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0),
    model: {
      position: new THREE.Vector3(0, 0, 2),
      rotation: new THREE.Euler(THREE.Math.degToRad(90), 0, 0)
    }
  },
  arms: [
    {
      radius: 0.4,
      length: 10,
      origin: {
        position: new THREE.Vector3(0, 0, 4),
        rotation: new THREE.Euler(0, 0, 0)
      },
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(0, 0, THREE.Math.degToRad(20)),
      model: {
        position: new THREE.Vector3(0, 0, 5),
        rotation: new THREE.Euler(THREE.Math.degToRad(90), 0, 0)
      }
    },
    {
      radius: 0.25,
      length: 10,
      origin: {
        position: new THREE.Vector3(0, 0, 10),
        rotation: new THREE.Euler(THREE.Math.degToRad(90), 0, 0)
      },
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(0, 0, THREE.Math.degToRad(20))
    },
    {
      radius: 0.25,
      length: 10,
      origin: {
        position: new THREE.Vector3(10, 0, 0),
        rotation: new THREE.Euler(0, 0, 0)
      },
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Euler(0, 0, THREE.Math.degToRad(-50))
    }
  ],
  hand: {
    origin: {
      position: new THREE.Vector3(10, 0, 0),
      rotation: new THREE.Euler(0, 0, 0)
    },
    position: new THREE.Vector3(0, 0, 0),
    rotation: new THREE.Euler(0, 0, 0)
  }
};

class Robot extends Component {
  constructor(props) {
    super(props);
    this.state = _initialState;
  }

  componentWillReceiveProps(nextProps) {
    // update arms
    let newArms = this.state.arms.slice();
    // update arm[0]
    newArms[0].length = nextProps.arms[0].length;
    newArms[0].rotation = new THREE.Euler(0, 0, THREE.Math.degToRad(nextProps.arms[0].phi));
    newArms[0].model.position = new THREE.Vector3(0, 0, nextProps.arms[0].length / 2);
    // update arm[1]
    newArms[1].length = nextProps.arms[1].length;
    newArms[1].origin = this.updateOrigin(this.state.arms[1].origin, nextProps.arms[0].length, 'Z');
    newArms[1].rotation = new THREE.Euler(0, 0, THREE.Math.degToRad(nextProps.arms[1].phi));
    // update arm[2]
    newArms[2].length = nextProps.arms[2].length;
    newArms[2].origin = this.updateOrigin(this.state.arms[2].origin, nextProps.arms[1].length, 'X');
    newArms[2].rotation = new THREE.Euler(0, 0, THREE.Math.degToRad(nextProps.arms[2].phi));
    // update hand
    let newHand = Object.assign({}, this.state.hand);
    newHand.origin = this.updateOrigin(this.state.hand.origin, nextProps.arms[2].length, 'X');
    this.setState({
      arms: newArms,
      hand: newHand
    });
  }

  updateOrigin = (currentOrigin, parentLength, coord = 'X') => {
    const newPosition = (coord === 'X')
      ? new THREE.Vector3(parentLength, 0, 0)
      : (coord === 'Y')
        ? new THREE.Vector3(0, parentLength, 0)
        : new THREE.Vector3(0, 0, parentLength)
    return {
      position: newPosition,
      rotation: currentOrigin.rotation
    };
  }

  render() {
  return (
      <group>
        <RobotArm
          origin={this.state.base.origin}
          visibleAxisArrows
          position={this.state.base.position}
          rotation={this.state.base.rotation}
          model={
            <RobotArmCylinder
              radius={this.state.base.radius}
              length={this.state.base.length}
              color={this.state.color}
              {...this.state.base.model}
            />
          }
        >
          <RobotArm
            origin={this.state.arms[0].origin}
            visibleAxisArrows
            position={this.state.arms[0].position}
            rotation={this.state.arms[0].rotation}
            model={
              <RobotArmCylinder
                radius={this.state.arms[0].radius}
                length={this.state.arms[0].length}
                color={this.state.color}
                {...this.state.arms[0].model}
              />
            }
          >
            <RobotArm
              origin={this.state.arms[1].origin}
              visibleAxisArrows
              position={this.state.arms[1].position}
              rotation={this.state.arms[1].rotation}
              model={
                <RobotArmCylinder
                  radius={this.state.arms[1].radius}
                  length={this.state.arms[1].length}
                  color={this.state.color}
                />
              }
            >
              <Joint radius={this.state.joint.radius} color={this.state.color}/>
              <RobotArm
                origin={this.state.arms[2].origin}
                visibleAxisArrows
                position={this.state.arms[2].position}
                rotation={this.state.arms[2].rotation}
                model={
                  <RobotArmCylinder
                    radius={this.state.arms[2].radius}
                    length={this.state.arms[2].length}
                    color={this.state.color}
                  />
                }
              >
                <Joint radius={this.state.joint.radius} color={this.state.color}/>
                <RobotArm
                  origin={this.state.hand.origin}
                  visibleAxisArrows
                  position={this.state.hand.position}
                  rotation={this.state.hand.rotation}
                  model={
                    <Joint radius={this.state.joint.radius} color={this.state.color}/>
                  }
                />
              </RobotArm>
            </RobotArm>
          </RobotArm>
        </RobotArm>
      </group>
    );
  }
}

Robot.propTypes = {
  arms: PropTypes.arrayOf(PropTypes.shape({
    length: PropTypes.number.isRequired,
    phi: PropTypes.number.isRequired
  }))
}

export default Robot;
