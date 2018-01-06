import React from 'react';
import * as THREE from 'three';

import Joint from './Joint';
import RobotArm from './RobotArm';

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
      rotation: new THREE.Euler(0, 0, 0)
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
        rotation: new THREE.Euler(0, 0, THREE.Math.degToRad(20))
      },
      {
        radius: 0.25,
        length: 10,
        origin: {
          position: new THREE.Vector3(0, 0, 10),
          rotation: new THREE.Euler(THREE.Math.degToRad(90), 0, 0)
        },
        position: new THREE.Vector3(0, 0, 0),
        rotation: new THREE.Euler(0, 0, THREE.Math.degToRad(20)),
        basePosition: new THREE.Vector3(5, 0, 0),
        baseRotation: new THREE.Euler(0, 0, THREE.Math.degToRad(-90))
      },
      {
        radius: 0.25,
        length: 10,
        origin: {
          position: new THREE.Vector3(10, 0, 0),
          rotation: new THREE.Euler(0, 0, 0)
        },
        position: new THREE.Vector3(0, 0, 0),
        rotation: new THREE.Euler(0, 0, THREE.Math.degToRad(-50)),
        basePosition: new THREE.Vector3(5, 0, 0),
        baseRotation: new THREE.Euler(0, 0, THREE.Math.degToRad(-90))
      }
    ]
  }
}

const Robot = props => {
  return (
    <group>
      <RobotArm
        radius={styles.robot.base.radius}
        length={styles.robot.base.length}
        color={styles.robot.color}
        origin={styles.robot.base.origin}
        position={styles.robot.base.position}
        rotation={styles.robot.base.rotation}
      >
        <RobotArm
          radius={styles.robot.arms[0].radius}
          length={styles.robot.arms[0].length}
          color={styles.robot.color}
          origin={styles.robot.arms[0].origin}
          position={styles.robot.arms[0].position}
          rotation={styles.robot.arms[0].rotation}
        >
          <RobotArm
            radius={styles.robot.arms[1].radius}
            length={styles.robot.arms[1].length}
            color={styles.robot.color}
            origin={styles.robot.arms[1].origin}
            position={styles.robot.arms[1].position}
            rotation={styles.robot.arms[1].rotation}
            basePosition={styles.robot.arms[1].basePosition}
            baseRotation={styles.robot.arms[1].baseRotation}
          >
            <Joint radius={styles.robot.joint.radius}/>
            <RobotArm
              radius={styles.robot.arms[2].radius}
              length={styles.robot.arms[2].length}
              color={styles.robot.color}
              origin={styles.robot.arms[2].origin}
              position={styles.robot.arms[2].position}
              rotation={styles.robot.arms[2].rotation}
              basePosition={styles.robot.arms[1].basePosition}
              baseRotation={styles.robot.arms[1].baseRotation}
            >
              <Joint radius={styles.robot.joint.radius}/>
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
