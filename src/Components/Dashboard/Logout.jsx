import React from 'react';
import './styles.css';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/LoginForm');
  };

  return (
    <div>
      <h2>Logout</h2>
      <p>You have been logged out.</p>
      <Sidebar/>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Logout;
