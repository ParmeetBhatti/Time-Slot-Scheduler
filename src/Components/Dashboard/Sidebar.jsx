import React from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout'

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <h2 style={{marginLeft: "20px"}}>Time Slot Scheduler</h2>
      <br />
      <Link className="sidebar-link" to="/Dashboard">Dashboard</Link>
      <Link className="sidebar-link" to="/CompareTimeSlot">CompareTimeSlot</Link>
      <Link className="sidebar-link" to="/LoginForm">Logout</Link>
    </div>
  );
};

export default Sidebar;  // Default export
