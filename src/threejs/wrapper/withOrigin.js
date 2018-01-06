import React, { Component } from 'react';

import ThreeAxisArrows from '../helpers/ThreeAxisArrows';

export const withOrigin = InnerComponent => {
  return class extends Component {
    render() {
      return (
        <group position={this.props.origin.position} rotation={this.props.origin.rotation}>
          <ThreeAxisArrows length={20} visible={this.props.visibleAxisArrows}/>
          <InnerComponent {...this.props}/>
        </group>
      );
    }
  };
}
