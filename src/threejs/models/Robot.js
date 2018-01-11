import React, { Component } from 'react';
import * as THREE from 'three';

import PropTypes from 'prop-types';

import Joint from './Joint';
import RobotArm from './RobotArm';
import RobotArmCylinder from './RobotArmCylinder';
import ThreeAxisArrows from '../helpers/ThreeAxisArrows';

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
  },
  DHVars: [
    {a: 0, alpha: 0, d: 4, phi: THREE.Math.degToRad(20)},
    {a: 0, alpha: 0, d: 10, phi: 0},
    {a: 0, alpha: THREE.Math.degToRad(90), d: 0, phi: THREE.Math.degToRad(20)},
    {a: 10, alpha: 0, d: 0, phi: THREE.Math.degToRad(-50)},
    {a: 10, alpha: 0, d: 0, phi: 0}
  ]
};

class Robot extends Component {
  constructor(props) {
    super(props);
    this.state = _initialState;
  }

  componentWillReceiveProps(nextProps) {
    const newColor = nextProps.color || this.state.color;

    let newDHVars = this.state.DHVars.map(paramsObj => Object.assign({}, paramsObj));
    let newArms = this.state.arms.slice();

    // update arm[0]
    newArms[0].length = nextProps.arms[0].length;
    newArms[0].rotation = new THREE.Euler(0, 0, THREE.Math.degToRad(nextProps.arms[0].phi));
    newArms[0].model.position = new THREE.Vector3(0, 0, nextProps.arms[0].length / 2);
    newDHVars[1].d = nextProps.arms[0].length;
    newDHVars[0].phi = THREE.Math.degToRad(nextProps.arms[0].phi);

    // update arm[1]
    newArms[1].length = nextProps.arms[1].length;
    newArms[1].origin = this.updateOrigin(this.state.arms[1].origin, nextProps.arms[0].length, 'Z');
    newArms[1].rotation = new THREE.Euler(0, 0, THREE.Math.degToRad(nextProps.arms[1].phi));
    newDHVars[3].a = nextProps.arms[1].length;
    newDHVars[2].phi = THREE.Math.degToRad(nextProps.arms[1].phi);

    // update arm[2]
    newArms[2].length = nextProps.arms[2].length;
    newArms[2].origin = this.updateOrigin(this.state.arms[2].origin, nextProps.arms[1].length, 'X');
    newArms[2].rotation = new THREE.Euler(0, 0, THREE.Math.degToRad(nextProps.arms[2].phi));
    newDHVars[4].a = nextProps.arms[2].length;
    newDHVars[3].phi = THREE.Math.degToRad(nextProps.arms[2].phi);

    // update hand
    let newHand = Object.assign({}, this.state.hand);
    newHand.origin = this.updateOrigin(this.state.hand.origin, nextProps.arms[2].length, 'X');

    this.setState({
      color: newColor,
      arms: newArms,
      hand: newHand,
      DHVars: newDHVars
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

  /**
   * 隣接する座標系$\Sigma_{i-1}$から$\Sigma_i$への同次変換行列を返す。
   * @param {number} a      : $X_{i-1}$軸方向への並進成分
   * @param {number} alpha  : $X_{i_1}$軸周りの回転成分（ラジアン）
   * @param {number} d      : alphaで回転後の$Z_{i-1}$軸方向の並進成分
   * @param {number} phi    : dで並進後の$Z_{i-1}$軸周りの回転成分（ラジアン）
   * @return {THREE.Matrix4}  : $\Sigma_{i-1}$から$\Sigma_i$への同次変換行列
   */
  transformDH = (a, alpha, d, phi) => {
    const {cos, sin} = Math;
    const ret = new THREE.Matrix4().set(
      cos(phi),               -sin(phi),              0,            a,
      cos(alpha) * sin(phi),  cos(alpha) * cos(phi),  -sin(alpha),  -d * sin(alpha),
      sin(alpha) * sin(phi),  sin(alpha) * cos(phi),  cos(alpha),   d * cos(alpha),
      0,                      0,                      0,            1
    );
    return ret;
  }

  /**
   * 変換行列からpositionとrotationを返す。
   * @param  {THREE.Matrix4} matrix : 変換行列
   * @return {{
   *   position: THREE.Vector3,
   *   rotation: THREE.Euler
   * }} : 変換行列から得られる位置ベクトルとオイラー角
   */
  extractPositioning = (matrix) => {
    let position = new THREE.Vector3();
    let rotation = new THREE.Quaternion();
    let _ = new THREE.Vector3();
    matrix.decompose(position, rotation, _);
    return {position: position, rotation: new THREE.Euler().setFromQuaternion(rotation)};
  }


  renderIndividually = () => {
    const transform = this.transformDH;
    const extract = this.extractPositioning;
    const DHVars = this.state.DHVars;
    return (
      <group>
        <RobotArm
          origin={this.state.base.origin}
          visibleAxisArrows={this.props.axisArrows[0].visible}
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
        />
        <RobotArm
          origin={this.state.base.origin}
          visibleAxisArrows={this.props.axisArrows[1].visible}
          {...extract(transform(DHVars[0].a, DHVars[0].alpha, DHVars[0].d, DHVars[0].phi))}
          model={
            <RobotArmCylinder
              radius={this.state.arms[0].radius}
              length={this.state.arms[0].length}
              color={this.state.color}
              {...this.state.arms[0].model}
            />
          }
        />
        <group {...this.state.base.origin}>
          <group {...extract(
            transform(DHVars[0].a, DHVars[0].alpha, DHVars[0].d, DHVars[0].phi)
              .multiply(transform(DHVars[1].a, DHVars[1].alpha, DHVars[1].d, DHVars[1].phi))
          )}>
            <ThreeAxisArrows
              origin={this.state.base.origin.position}
              length={20}
              visible={this.props.axisArrows[2].visible}
            />
          </group>
        </group>
        <RobotArm
          origin={this.state.base.origin}
          visibleAxisArrows={this.props.axisArrows[3].visible}
          {...extract(
            transform(DHVars[0].a, DHVars[0].alpha, DHVars[0].d, DHVars[0].phi)
              .multiply(transform(DHVars[1].a, DHVars[1].alpha, DHVars[1].d, DHVars[1].phi))
              .multiply(transform(DHVars[2].a, DHVars[2].alpha, DHVars[2].d, DHVars[2].phi))
          )}
          model={
            <RobotArmCylinder
              radius={this.state.arms[1].radius}
              length={this.state.arms[1].length}
              color={this.state.color}
            />
          }
        />
        <group {...this.state.base.origin}>
          <group {...extract(
            transform(DHVars[0].a, DHVars[0].alpha, DHVars[0].d, DHVars[0].phi)
              .multiply(transform(DHVars[1].a, DHVars[1].alpha, DHVars[1].d, DHVars[1].phi))
              .multiply(transform(DHVars[2].a, DHVars[2].alpha, DHVars[2].d, DHVars[2].phi))
          )}>
            <Joint radius={this.state.joint.radius} color={this.state.color}/>
          </group>
        </group>
        <RobotArm
          origin={this.state.base.origin}
          visibleAxisArrows={this.props.axisArrows[4].visible}
          {...extract(
            transform(DHVars[0].a, DHVars[0].alpha, DHVars[0].d, DHVars[0].phi)
              .multiply(transform(DHVars[1].a, DHVars[1].alpha, DHVars[1].d, DHVars[1].phi))
              .multiply(transform(DHVars[2].a, DHVars[2].alpha, DHVars[2].d, DHVars[2].phi))
              .multiply(transform(DHVars[3].a, DHVars[3].alpha, DHVars[3].d, DHVars[3].phi))
          )}
          model={
            <RobotArmCylinder
              radius={this.state.arms[2].radius}
              length={this.state.arms[2].length}
              color={this.state.color}
            />
          }
        />
        <group {...this.state.base.origin}>
          <group {...extract(
            transform(DHVars[0].a, DHVars[0].alpha, DHVars[0].d, DHVars[0].phi)
              .multiply(transform(DHVars[1].a, DHVars[1].alpha, DHVars[1].d, DHVars[1].phi))
              .multiply(transform(DHVars[2].a, DHVars[2].alpha, DHVars[2].d, DHVars[2].phi))
              .multiply(transform(DHVars[3].a, DHVars[3].alpha, DHVars[3].d, DHVars[3].phi))
          )}>
            <Joint radius={this.state.joint.radius} color={this.state.color}/>
          </group>
        </group>
        <RobotArm
          origin={this.state.base.origin}
          visibleAxisArrows={this.props.axisArrows[5].visible}
          {...extract(
            transform(DHVars[0].a, DHVars[0].alpha, DHVars[0].d, DHVars[0].phi)
              .multiply(transform(DHVars[1].a, DHVars[1].alpha, DHVars[1].d, DHVars[1].phi))
              .multiply(transform(DHVars[2].a, DHVars[2].alpha, DHVars[2].d, DHVars[2].phi))
              .multiply(transform(DHVars[3].a, DHVars[3].alpha, DHVars[3].d, DHVars[3].phi))
              .multiply(transform(DHVars[4].a, DHVars[4].alpha, DHVars[4].d, DHVars[4].phi))
          )}
          model={
            <Joint radius={this.state.joint.radius} color={this.state.color}/>
          }
        />
      </group>
    );
  }

  renderHierarchically = () => {
    return (
      <group>
        <RobotArm
          origin={this.state.base.origin}
          visibleAxisArrows={this.props.axisArrows[0].visible}
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
            visibleAxisArrows={this.props.axisArrows[1].visible}
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
            <ThreeAxisArrows
              origin={this.state.arms[1].origin.position}
              length={20}
              visible={this.props.axisArrows[2].visible}
            />
            <RobotArm
              origin={this.state.arms[1].origin}
              visibleAxisArrows={this.props.axisArrows[3].visible}
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
                visibleAxisArrows={this.props.axisArrows[4].visible}
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
                  visibleAxisArrows={this.props.axisArrows[5].visible}
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

  render() {
    if (this.props.renderIndividually) {
      return this.renderIndividually();
    } else {
      return this.renderHierarchically();
    }
  }
}

Robot.defaultProps = {
  axisArrows: [
    {visible: true},
    {visible: true},
    {visible: true},
    {visible: true},
    {visible: true},
    {visible: true},
  ]
}

Robot.propTypes = {
  arms: PropTypes.arrayOf(PropTypes.shape({
    length: PropTypes.number.isRequired,
    phi: PropTypes.number.isRequired
  })),
  axisArrows: PropTypes.arrayOf(PropTypes.shape({
    visible: PropTypes.bool.isRequired
  })),
  renderIndividually: PropTypes.bool
}

export default Robot;
