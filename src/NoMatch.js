import { Link } from 'react-router-dom';
import React from 'react';

const NoMatch = props => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
      </ul>
    </nav>
  );
}

export default NoMatch;
