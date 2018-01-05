import { Button, Grid, Paper, Typography } from 'material-ui';
import React from 'react';

import DashboardScene from './threejs/scenes/DashboardScene';
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

const Dashboard = props => {
  return (
    <div style={styles.item}>
      <NavigationBar title="Dashboard"/>
      <Grid container style={styles.content}>
        <Grid item xs={12} style={styles.item}>
          <Grid container justify="center" alignItems="stretch" style={styles.item}>
            <Grid item xs={12} md={8} style={styles.item}>
              <div style={styles.view}>
                <DashboardScene/>
              </div>
            </Grid>
            <Grid item xs={12} md={4} style={styles.item}>
              <Paper style={styles.paper}>
                <Typography type="headline">Controllers</Typography>
                <Button raised>PUSH ME!</Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
