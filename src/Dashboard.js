import React from 'react';

import DashboardScene from './threejs/DashboardScene';
import NavigationBar from './NavigationBar';

const Dashboard = props => {
  return (
    <div>
      <NavigationBar title="Dashboard"/>
      <DashboardScene/>
    </div>
  );
}

export default Dashboard;
