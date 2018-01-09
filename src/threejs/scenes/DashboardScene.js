import { sizeMe } from 'react-sizeme';
import React, {Component} from 'react';

import Robot from '../models/Robot';
import World from './World';

class DashboardScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: null
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
          <Robot arms={[{length: 10, phi: 20}, {length: 10, phi: 50}, {length: 20, phi: 30}]}/>
        </World>
      </div>
    );
  }
}

export default sizeMe({monitorHeight:true})(DashboardScene);
