import React from 'react';
import * as THREE from 'three';

import Joint from './Joint';
import RobotArm from './RobotArm';
import ThreeAxisArrows from '../helpers/ThreeAxisArrows';

const styles = {
  robot: {
    color: "#DDDDDD",
    joint: {
      radius: 0.5
    },
    base: {
      radius: 2,
      length: 4,
      localPosition: new THREE.Vector3(0, 0, 0),
      localRotation: new THREE.Euler(THREE.Math.degToRad(-90), 0, 0)
    },
    arms: [
      {
        radius: 0.4,
        length: 10,
        localPosition: new THREE.Vector3(0, 0, 4),
        localRotation: new THREE.Euler(0, 0, THREE.Math.degToRad(20))
      },
      {
        radius: 0.25,
        length: 10,
        localPosition: new THREE.Vector3(0, 0, 10),
        localRotation: new THREE.Euler(THREE.Math.degToRad(90), 0, 0)
      },
      {
        radius: 0.25,
        length: 10,
        localPosition: new THREE.Vector3(0, 0, 10),
        localRotation: new THREE.Euler()
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
        position={styles.robot.base.localPosition}
        rotation={styles.robot.base.localRotation}
      >
        <ThreeAxisArrows length={20} visible/>
        <RobotArm
          radius={styles.robot.arms[0].radius}
          length={styles.robot.arms[0].length}
          color={styles.robot.color}
          position={styles.robot.arms[0].localPosition}
          rotation={styles.robot.arms[0].localRotation}
        >
          <ThreeAxisArrows length={20} visible/>
          <RobotArm
            radius={styles.robot.arms[1].radius}
            length={styles.robot.arms[1].length}
            color={styles.robot.color}
            position={styles.robot.arms[1].localPosition}
            rotation={styles.robot.arms[1].localRotation}
          >
            <ThreeAxisArrows length={20} visible={true}/>
            <Joint radius={styles.robot.joint.radius}/>
            <RobotArm
              radius={styles.robot.arms[2].radius}
              length={styles.robot.arms[2].length}
              color={styles.robot.color}
              position={styles.robot.arms[2].localPosition}
              rotation={styles.robot.arms[2].localRotation}
            >
              <ThreeAxisArrows length={20} visible={true}/>
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
