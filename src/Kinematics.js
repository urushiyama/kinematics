import { Grid, Paper, TextField, Typography } from 'material-ui';
import React, { Component } from 'react';

import KinematicsScene from './threejs/scenes/DashboardScene';
import NavigationBar from './NavigationBar';

const styles = {
  content: {
    flexGrow: 1,
    height: 'calc(100% - 64px)',
    width: '100%'
  },
  item: {
    height: '100%',
    width: '100%'
  },
  paper: {
    marginTop: 16,
    padding: 16,
    height: '100%',
    width: '100%'
  },
  view: {
    marginTop: 32,
    marginLeft: 16,
    height: '100%',
    width: '100%'
  }
}

class Kinematics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arms: [
        {length: 10, phi: 0},
        {length: 10, phi: 20},
        {length: 10, phi: -40}
      ]
    };
  }

  onChangeArms = event => {
    const newArms = this.state.arms.slice();
    switch (event.target.name) {
      case "arm-0-length":
        newArms[0].length = event.target.value;
        this.setState({arms: newArms});
        break;
      case "arm-0-phi":
        newArms[0].phi = event.target.value;
        this.setState({arms: newArms});
        break;
      case "arm-1-length":
        newArms[1].length = event.target.value;
        this.setState({arms: newArms});
        break;
      case "arm-1-phi":
        newArms[1].phi = event.target.value;
        this.setState({arms: newArms});
        break;
      case "arm-2-length":
        newArms[2].length = event.target.value;
        this.setState({arms: newArms});
        break;
      case "arm-2-phi":
        newArms[2].phi = event.target.value;
        this.setState({arms: newArms});
        break;
      default:
        // no change
    }
  }

  render() {
    return (
      <div style={styles.item}>
        <NavigationBar title="Dashboard"/>
        <Grid container style={styles.content}>
          <Grid item xs={12} style={styles.item}>
            <Grid container justify="center" alignItems="stretch" style={styles.item}>
              <Grid item xs={12} md={8} style={styles.item}>
                <div style={styles.view}>
                  <KinematicsScene arms={this.state.arms}/>
                </div>
              </Grid>
              <Grid item xs={12} md={4} style={styles.item}>
                <Paper style={styles.paper}>
                  <Typography type="headline">Controllers</Typography>
                  <TextField
                    name="arm-0-length"
                    label="a1"
                    type="number"
                    value={this.state.arms[0].length}
                    onChange={this.onChangeArms}
                  />
                  <TextField
                    name="arm-0-phi"
                    label="φ1"
                    type="number"
                    value={this.state.arms[0].phi}
                    onChange={this.onChangeArms}
                  />
                  <TextField
                    name="arm-1-length"
                    label="a2"
                    type="number"
                    value={this.state.arms[1].length}
                    onChange={this.onChangeArms}
                  />
                  <TextField
                    name="arm-1-phi"
                    label="φ2"
                    type="number"
                    value={this.state.arms[1].phi}
                    onChange={this.onChangeArms}
                  />
                  <TextField
                    name="arm-2-length"
                    label="a3"
                    type="number"
                    value={this.state.arms[2].length}
                    onChange={this.onChangeArms}
                  />
                  <TextField
                    name="arm-2-phi"
                    label="φ3"
                    type="number"
                    value={this.state.arms[2].phi}
                    onChange={this.onChangeArms}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Kinematics;
