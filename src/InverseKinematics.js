import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Switch,
  TextField,
  Typography
} from 'material-ui';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import * as THREE from 'three';

import InverseKinematicsScene from './threejs/scenes/InverseKinematicsScene';
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
    width: '100%',
    overflowX: 'scroll'
  },
  card: {
    padding: 16
  },
  view: {
    marginTop: 32,
    marginLeft: 16,
    height: '100%',
    width: '100%'
  },
  robot: {
    backgroundColor: "#DDAA00",
    width: 32,
    height: 32
  },
  header: {
    marginTop: 32
  }
}

class InverseKinematics extends Component {
  constructor(props) {
    super(props);
    this.updateQueryLimit = 0.999;
    this.state = {
      base: {length: 4, phi: 0},
      arms: [
        {length: 10, phi: 0},
        {length: 10, phi: 20},
        {length: 10, phi: -40}
      ],
      target: {X: 0, Y: 0, Z: 0},
      move: true,
      input: {
        arms: [
          {length: '10', phi: '0'},
          {length: '10', phi: '20'},
          {length: '10', phi: '-40'}
        ],
        target: {X: '0', Y: '0', Z: '0'}
      },
      axisArrows: [
        {visible: true},
        {visible: true},
        {visible: true},
        {visible: true},
        {visible: true},
        {visible: true},
      ]
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
    const newInput = Object.assign({}, this.state.input);
    const value = event.target.value;
    const valueNumber = parseNumber(value);
    const isValid = (!Number.isNaN(valueNumber));
    switch (name) {
      case "arm-0-length":
        newInput.arms[0].length = value;
        newArms[0].length = valueNumber;
        break;
      case "arm-0-phi":
        newInput.arms[0].phi = value;
        newArms[0].phi = valueNumber;
        break;
      case "arm-1-length":
        newInput.arms[1].length = value;
        newArms[1].length = valueNumber;
        break;
      case "arm-1-phi":
        newInput.arms[1].phi = value;
        newArms[1].phi = valueNumber;
        break;
      case "arm-2-length":
        newInput.arms[2].length = value;
        newArms[2].length = valueNumber;
        break;
      case "arm-2-phi":
        newInput.arms[2].phi = value;
        newArms[2].phi = valueNumber;
        break;
      default:
        // no change
    }
    if (isValid) {
      this.setState({
        arms: newArms,
        input: newInput
      });
    } else {
      this.setState({
        input: newInput
      })
    }
  }

  onChangeAxisArrows = (name) => (event) => {
    const newValues = this.state.axisArrows.map(object => Object.assign({}, object));
    switch (name) {
      case "coord-system-0-visible":
        newValues[0].visible = !newValues[0].visible;
        break;
      case "coord-system-1-visible":
        newValues[1].visible = !newValues[1].visible;
        break;
      case "coord-system-2-visible":
        newValues[2].visible = !newValues[2].visible;
        break;
      case "coord-system-3-visible":
        newValues[3].visible = !newValues[3].visible;
        break;
      case "coord-system-4-visible":
        newValues[4].visible = !newValues[4].visible;
        break;
      case "coord-system-5-visible":
        newValues[5].visible = !newValues[5].visible;
        break;
      default:
        // No change
    }
    this.setState({axisArrows: newValues});
  }

  onChangeTarget = (name) => (event) => {
    const parseNumber = (string) => {
      if(/^(-|\+)?[0-9]+(\.[0-9]+)?$/.test(value)) {
        return Number(value);
      } else {
        return NaN;
      }
    }
    const newTarget = Object.assign({}, this.state.target);
    const newInput = Object.assign({}, this.state.input);
    const value = event.target.value;
    const valueNumber = parseNumber(value);
    const isValid = (!Number.isNaN(valueNumber));
    switch (name) {
      case "X":
        newInput.target.X = value;
        newTarget.X = valueNumber;
        break;
      case "Y":
        newInput.target.Y = value;
        newTarget.Y = valueNumber;
        break;
      case "Z":
        newInput.target.Z = value;
        newTarget.Z = valueNumber;
        break;
      default:
        // no change
    }
    if (isValid) {
      this.setState({
        target: newTarget,
        input: newInput
      });
    } else {
      this.setState({
        input: newInput
      })
    }
  }

  onChangeMove = (event) => {
    this.setState({move: !this.state.move});
  }

  jacobian = (query) => {
    const {phi1, phi3, a4, phi4, a5} = query;
    // q = (phi1, phi3, phi4)T
    const {sin, cos} = Math;
    const dr1_dq1 = -sin(phi1)*(a4*cos(phi3)+a5*cos(phi3+phi4));
    const dr1_dq2 = -cos(phi1)*(a4*sin(phi3)+a5*sin(phi3+phi4));
    const dr1_dq3 = -cos(phi1)*a5*sin(phi3+phi4);
    const dr2_dq1 = cos(phi1)*(a4*cos(phi3)+a5*cos(phi3+phi4));
    const dr2_dq2 = -sin(phi1)*(a4*sin(phi3)+a5*sin(phi3+phi4));
    const dr2_dq3 = -sin(phi1)*a5*sin(phi3+phi4);
    const dr3_dq1 = 0;
    const dr3_dq2 = a4*cos(phi3)+a5*cos(phi3+phi4);
    const dr3_dq3 = a5*cos(phi3+phi4);
    const ret = new THREE.Matrix3().set(
      dr1_dq1, dr1_dq2, dr1_dq3,
      dr2_dq1, dr2_dq2, dr2_dq3,
      dr3_dq1, dr3_dq2, dr3_dq3
    );
    return ret;
  }

  updateQuery = (query) => {
    const {sin, cos} = Math;
    const {d1, phi1, d2, phi3, a4, phi4, a5} = query;
    let newQuery = Object.assign({}, query);
    let newQueryVector = new THREE.Vector3();
    const queryVector = new THREE.Vector3(phi1, phi3, phi4);
    const riVector = new THREE.Vector3(
      cos(phi1)*cos(phi3+phi4)*a5 + cos(phi1)*cos(phi3)*a4,
      sin(phi1)*cos(phi3+phi4)*a5 + sin(phi1)*cos(phi3)*a4,
      sin(phi3+phi4)*a5 + sin(phi3)*a4 + d1 + d2
    );
    const rdVector = new THREE.Vector3(
      this.state.target.X,
      this.state.target.Y,
      this.state.target.Z
    );
    const J = this.jacobian(query);
    const invJMatrix3 = new THREE.Matrix3().getInverse(J);
    const riMinusrd = riVector.add(rdVector.negate());
    newQueryVector
      .add(queryVector)
      .add(riMinusrd.applyMatrix3(invJMatrix3).negate());
    const delta = (
      ((cos(newQueryVector.x)*cos(phi1)+sin(newQueryVector.x)*sin(phi1))
      +(cos(newQueryVector.y)*cos(phi3)+sin(newQueryVector.y)*sin(phi3))
      +(cos(newQueryVector.z)*cos(phi4)+sin(newQueryVector.z)*sin(phi4))) / 3.0
    );
    newQuery.phi1 = newQueryVector.x;
    newQuery.phi3 = newQueryVector.y;
    newQuery.phi4 = newQueryVector.z;
    return {query: newQuery, delta: delta};
  }

  onAnimate = () => {
    if (this.state.move) {
      const {query, delta} = this.updateQuery({
        d1: this.state.base.length,
        phi1: THREE.Math.degToRad((this.state.arms[0].phi + 360) % 360),
        d2: this.state.arms[0].length,
        phi3: THREE.Math.degToRad((this.state.arms[1].phi + 360) % 360),
        a4: this.state.arms[1].length,
        phi4: THREE.Math.degToRad((this.state.arms[2].phi + 360) % 360),
        a5: this.state.arms[2].length
      });
      if (delta < this.updateQueryLimit) {
        const newArms = this.state.arms.map(object => Object.assign({}, object));
        newArms[0].phi = THREE.Math.radToDeg(query.phi1);
        newArms[1].phi = THREE.Math.radToDeg(query.phi3);
        newArms[2].phi = THREE.Math.radToDeg(query.phi4);
        const newInput = Object.assign({}, this.state.input);
        newInput.arms[0].phi = `${newArms[0].phi}`;
        newInput.arms[1].phi = `${newArms[1].phi}`;
        newInput.arms[2].phi = `${newArms[2].phi}`;
        this.setState({arms: newArms, input: newInput});
      } else {
        this.setState({move: false});
      }
    }
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
                  <InverseKinematicsScene
                    base={this.state.base}
                    arms={this.state.arms}
                    axisArrows={this.state.axisArrows}
                    color={styles.robot.backgroundColor}
                    onAnimate={this.onAnimate}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={4} style={styles.item}>
                <Paper style={styles.paper}>
                  <Grid container justify="center">
                    <Grid item xs={12}>
                      <Card style={styles.card}>
                        <CardContent>
                          <Typography type="headline" align="center">コントローラ</Typography>
                          <Divider/>
                          <Grid container justify="center">
                            <Grid item xs={12} style={styles.header}>
                              <Typography type="title">手先位置</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormGroup>
                                <TextField
                                  label="X"
                                  type="number"
                                  value={this.state.input.target.X}
                                  onChange={this.onChangeTarget("X")}
                                />
                                <TextField
                                  label="Y"
                                  type="number"
                                  value={this.state.input.target.Y}
                                  onChange={this.onChangeTarget("Y")}
                                />
                                <TextField
                                  label="Z"
                                  type="number"
                                  value={this.state.input.target.Z}
                                  onChange={this.onChangeTarget("Z")}
                                />
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Switch
                                        checked={this.state.move}
                                        onChange={this.onChangeMove}
                                      />
                                    }
                                    label="手先位置を移動する"
                                  />
                                </FormGroup>
                                {/* <Switch disabled={this.state.disabledMove}>手先位置を移動する</Switch> */}
                              </FormGroup>
                            </Grid>
                          </Grid>
                          <Divider/>
                          <Grid container justify="center">
                            <Grid item xs={12} style={styles.header}>
                              <Typography type="title">Σ0</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={this.state.axisArrows[0].visible}
                                      onChange={this.onChangeAxisArrows("coord-system-0-visible")}
                                    />
                                  }
                                  label="座標軸の矢印を表示"
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} style={styles.header}>
                              <Typography type="title">Σ1</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={this.state.axisArrows[1].visible}
                                      onChange={this.onChangeAxisArrows("coord-system-1-visible")}
                                    />
                                  }
                                  label="座標軸の矢印を表示"
                                />
                                <TextField
                                  label="φ1"
                                  type="number"
                                  value={this.state.input.arms[0].phi}
                                  onChange={this.onChangeArms('arm-0-phi')}
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} style={styles.header}>
                              <Typography type="title">Σ2</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={this.state.axisArrows[2].visible}
                                      onChange={this.onChangeAxisArrows("coord-system-2-visible")}
                                    />
                                  }
                                  label="座標軸の矢印を表示"
                                />
                                <TextField
                                  label="d2"
                                  type="number"
                                  value={this.state.input.arms[0].length}
                                  onChange={this.onChangeArms('arm-0-length')}
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} style={styles.header}>
                              <Typography type="title">Σ3</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={this.state.axisArrows[3].visible}
                                      onChange={this.onChangeAxisArrows("coord-system-3-visible")}
                                    />
                                  }
                                  label="座標軸の矢印を表示"
                                />
                                <TextField
                                  label="φ3"
                                  type="number"
                                  value={this.state.input.arms[1].phi}
                                  onChange={this.onChangeArms('arm-1-phi')}
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} style={styles.header}>
                              <Typography type="title">Σ4</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={this.state.axisArrows[4].visible}
                                      onChange={this.onChangeAxisArrows("coord-system-4-visible")}
                                    />
                                  }
                                  label="座標軸の矢印を表示"
                                />
                                <TextField
                                  label="a4"
                                  type="number"
                                  value={this.state.input.arms[1].length}
                                  onChange={this.onChangeArms('arm-1-length')}
                                />
                                <TextField
                                  label="φ4"
                                  type="number"
                                  value={this.state.input.arms[2].phi}
                                  onChange={this.onChangeArms('arm-2-phi')}
                                />
                              </FormGroup>
                            </Grid>
                            <Grid item xs={12} style={styles.header}>
                              <Typography type="title">Σ5</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={this.state.axisArrows[5].visible}
                                      onChange={this.onChangeAxisArrows("coord-system-5-visible")}
                                    />
                                  }
                                  label="座標軸の矢印を表示"
                                />
                                <TextField
                                  label="a5"
                                  type="number"
                                  value={this.state.input.arms[2].length}
                                  onChange={this.onChangeArms('arm-2-length')}
                                />
                              </FormGroup>
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

export default InverseKinematics;
