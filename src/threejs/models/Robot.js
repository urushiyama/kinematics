import React from 'react';
import * as THREE from 'three';

import Joint from './Joint';
import RobotArm from './RobotArm';
import RobotArmCylinder from './RobotArmCylinder';

const styles = {
  robot: {
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
  }
}

const Robot = props => {
  return (
    <group>
      <RobotArm
        origin={styles.robot.base.origin}
        visibleAxisArrows
        position={styles.robot.base.position}
        rotation={styles.robot.base.rotation}
        model={
          <RobotArmCylinder
            radius={styles.robot.base.radius}
            length={styles.robot.base.length}
            color={styles.robot.color}
            {...styles.robot.base.model}
          />
        }
      >
        <RobotArm
          origin={styles.robot.arms[0].origin}
          visibleAxisArrows
          position={styles.robot.arms[0].position}
          rotation={styles.robot.arms[0].rotation}
          model={
            <RobotArmCylinder
              radius={styles.robot.arms[0].radius}
              length={styles.robot.arms[0].length}
              color={styles.robot.color}
              {...styles.robot.arms[0].model}
            />
          }
        >
          <RobotArm
            origin={styles.robot.arms[1].origin}
            visibleAxisArrows
            position={styles.robot.arms[1].position}
            rotation={styles.robot.arms[1].rotation}
            model={
              <RobotArmCylinder
                radius={styles.robot.arms[1].radius}
                length={styles.robot.arms[1].length}
                color={styles.robot.color}
              />
            }
          >
            <Joint radius={styles.robot.joint.radius} color={styles.robot.color}/>
            <RobotArm
              origin={styles.robot.arms[2].origin}
              visibleAxisArrows
              position={styles.robot.arms[2].position}
              rotation={styles.robot.arms[2].rotation}
              model={
                <RobotArmCylinder
                  radius={styles.robot.arms[2].radius}
                  length={styles.robot.arms[2].length}
                  color={styles.robot.color}
                />
              }
            >
              <Joint radius={styles.robot.joint.radius} color={styles.robot.color}/>
              <RobotArm
                origin={styles.robot.hand.origin}
                visibleAxisArrows
                position={styles.robot.hand.position}
                rotation={styles.robot.hand.rotation}
                model={
                  <Joint radius={styles.robot.joint.radius} color={styles.robot.color}/>
                }
              />
            </RobotArm>
          </RobotArm>
        </RobotArm>
      </RobotArm>
    </group>
  );
}

Robot.propTypes = {
}

export default Robot;
