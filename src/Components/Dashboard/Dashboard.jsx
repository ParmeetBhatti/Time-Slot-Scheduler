import React, { useState, useEffect } from 'react';
import './styles.css';
import { firestore } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import usePreventBack from '../usePreventBack';

const Dashboard = () => {
  const [user, setUser] = useState({ email: '', name: '' });
  const [date, setDate] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const [purpose, setPurpose] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  usePreventBack();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/LoginForm');
    }
  }, [navigate]);

  const availableTimeSlots = ['9-10 AM', '10-11 AM', '11-12 PM', '12-1 PM', '2-3 PM', '3-4 PM', '4-5 PM', '5-6 PM'];

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeSlotChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setTimeSlots([...timeSlots, value]);
    } else {
      setTimeSlots(timeSlots.filter(slot => slot !== value));
    }
  };

  const handlePurposeChange = (e) => {
    setPurpose(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, 'projectscheduler'), {
        name: user.name,
        email: user.email,
        date,
        timeSlots,
        purpose,
        timestamp: new Date()
      });
      setMessage('Data saved successfully!');
      setDate('');
      setTimeSlots([]);
      setPurpose('');
    } catch (error) {
      setMessage(`Error saving data: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='container'>
        <h1>Dashboard</h1>
        <Sidebar />
        <h2>Hello, welcome {user.name}!</h2>
        <div>
          <label><h3 style={{marginLeft:"40px"}}>Purpose</h3></label>
          <select value={purpose} onChange={handlePurposeChange} required>
            <option value="">Select a purpose</option>
            <option value="mini project evaluation">Mini Project Evaluation</option>
            <option value="ly project evaluation">LY Project Evaluation</option>
            <option value="sem long internship evaluation">Sem Long Internship Evaluation</option>
          </select>
          <br/><br/>
          <label><h3>Select date and time slots</h3></label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            required
          />
          <br/><br/>
          {availableTimeSlots.map(slot => (
            <div key={slot} className='time-slots'>
              <input
                type="checkbox"
                id={slot}
                value={slot}
                checked={timeSlots.includes(slot)}
                onChange={handleTimeSlotChange}
              />
              <label htmlFor={slot}>{slot}</label>
            </div>
          ))}
        </div>
        <br/>
        <button className='but' type="submit">Submit</button>
        {message && <p>{message}</p>}
      </div>
    </form>
  );
};

export default Dashboard;
