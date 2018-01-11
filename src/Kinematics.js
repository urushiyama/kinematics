import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography
} from 'material-ui';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import RobotArmIcon from 'material-ui-icons/Timeline';

import KinematicsScene from './threejs/scenes/KinematicsScene';
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
  },
  individually: {
    backgroundColor: "#DDAA00",
    width: 32,
    height: 32
  },
  hierarchically: {
    backgroundColor: "#00AADD",
    width: 32,
    height: 32
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
      ],
      input: {
        arms: [
          {length: '10', phi: '0'},
          {length: '10', phi: '20'},
          {length: '10', phi: '-40'}
        ],
      }
    };
  }

  onChangeArms = (name) => (event) => {
    const parseNumber = (string) => {
      if(/^(-|\+)?[0-9]+(\.[0-9]+)?$/.test(value)) {
        return Number(value);
      } else {
        return NaN;
      }
    }
    const newArms = this.state.arms.map(object => Object.assign({}, object));
    const newInputArms = this.state.input.arms.map(object => Object.assign({}, object));
    const value = event.target.value;
    const valueNumber = parseNumber(value);
    const isValid = (!Number.isNaN(valueNumber));
    switch (name) {
      case "arm-0-length":
        newInputArms[0].length = value;
        newArms[0].length = valueNumber;
        break;
      case "arm-0-phi":
        newInputArms[0].phi = value;
        newArms[0].phi = valueNumber;
        break;
      case "arm-1-length":
        newInputArms[1].length = value;
        newArms[1].length = valueNumber;
        break;
      case "arm-1-phi":
        newInputArms[1].phi = value;
        newArms[1].phi = valueNumber;
        break;
      case "arm-2-length":
        newInputArms[2].length = value;
        newArms[2].length = valueNumber;
        break;
      case "arm-2-phi":
        newInputArms[2].phi = value;
        newArms[2].phi = valueNumber;
        break;
      default:
        // no change
    }
    if (isValid) {
      this.setState({
        arms: newArms,
        input: {arms: newInputArms}
      });
    } else {
      this.setState({
        input: {arms: newInputArms}
      })
    }
  }

  onAnimate = () => {

  }

  render() {
    return (
      <div style={styles.item}>
        <NavigationBar title="Kinematics"/>
        <Grid container style={styles.content}>
          <Grid item xs={12} style={styles.item}>
            <Grid container justify="center" alignItems="stretch" style={styles.item}>
              <Grid item xs={12} md={8} style={styles.item}>
                <div style={styles.view}>
                  <KinematicsScene
                    arms={this.state.arms}
                    colors={{
                      individually: styles.individually.backgroundColor,
                      hierarchically: styles.hierarchically.backgroundColor
                    }}
                    onAnimate={this.onAnimate}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4} style={styles.item}>
                <Paper style={styles.paper}>
                  <Grid container justify="center">
                    <List>
                      <ListItem>
                        <Avatar style={styles.individually}>
                          <RobotArmIcon/>
                        </Avatar>
                        <ListItemText primary="Denavit-Hartenberg法に基づく同次変換行列により位置姿勢を計算したロボットアーム" />
                      </ListItem>
                      <ListItem>
                        <Avatar style={styles.hierarchically}>
                          <RobotArmIcon/>
                        </Avatar>
                        <ListItemText primary="階層モデリングによるロボットアーム" />
                      </ListItem>
                    </List>
                    <Grid item xs={12}>
                      <Card>
                        <CardContent>
                          <Typography type="headline">コントローラ</Typography>
                          <Grid container justify="center">
                            <Grid item xs={12}>
                              <TextField
                                label="d2"
                                type="number"
                                value={this.state.input.arms[0].length}
                                onChange={this.onChangeArms('arm-0-length')}
                              />
                              <TextField
                                label="φ1"
                                type="number"
                                value={this.state.input.arms[0].phi}
                                onChange={this.onChangeArms('arm-0-phi')}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="a3"
                                type="number"
                                value={this.state.input.arms[1].length}
                                onChange={this.onChangeArms('arm-1-length')}
                              />
                              <TextField
                                label="φ2"
                                type="number"
                                value={this.state.input.arms[1].phi}
                                onChange={this.onChangeArms('arm-1-phi')}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="a4"
                                type="number"
                                value={this.state.input.arms[2].length}
                                onChange={this.onChangeArms('arm-2-length')}
                              />
                              <TextField
                                label="φ3"
                                type="number"
                                value={this.state.input.arms[2].phi}
                                onChange={this.onChangeArms('arm-2-phi')}
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={3}>
                      <Link to="/">
                        <Button raised>戻る</Button>
                      </Link>
                    </Grid>
                  </Grid>
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
