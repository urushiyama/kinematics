import React, { Component } from 'react';

import ThreeAxisArrows from '../helpers/ThreeAxisArrows';

export const withOrigin = InnerComponent => {
  return class extends Component {
    render() {
      let innerProps = Object.assign({}, this.props);
      delete innerProps.children;
      return (
        <group position={this.props.origin.position} rotation={this.props.origin.rotation}>
          <InnerComponent {...innerProps}>
            <group>
              <ThreeAxisArrows length={20} visible={this.props.visibleAxisArrows}/>
              {this.props.children}
            </group>
          </InnerComponent>
        </group>
      );
    }
  };
}
