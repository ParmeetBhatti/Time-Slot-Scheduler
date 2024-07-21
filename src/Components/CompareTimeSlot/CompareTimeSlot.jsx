import React, { useState, useEffect } from 'react';
import { firestore } from '../Dashboard/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Sidebar from '../Dashboard/Sidebar';
import emailjs from 'emailjs-com';
import './CompareTimeSlot.css';
import usePreventBack from '../usePreventBack';

const CompareTimeSlots = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState({ user1: '', user2: '', user3: '' });
  const [commonSlot, setCommonSlot] = useState('');
  const [emails, setEmails] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [purpose, setPurpose] = useState('');

  usePreventBack();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    } else {
      console.error("No user is logged in.");
    }

    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(firestore, 'users'));
      const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setSelectedUsers({
      ...selectedUsers,
      [e.target.name]: e.target.value,
    });
  };

  const handlePurposeChange = (e) => {
    setPurpose(e.target.value);
  };

  const sendEmail = (commonSlot, email, templateId) => {
    if (!email) {
      console.error("Email is empty. Cannot send email.");
      return;
    }

    const templateParams = {
      common_slot: commonSlot,
      to_email: email,
      purpose: purpose
    };

    emailjs.send('service_mpp30ha', templateId, templateParams, 'JQ9g5EHmq6so9GBnL')
      .then((response) => {
        console.log(`Email sent successfully to ${email}!`, response.status, response.text);
        alert(`Email sent successfully to ${email}!`);
      }, (error) => {
        console.error('Failed to send email:', error);
        alert('Failed to send email:', error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slots = [];
    const purposes = [];
    const emailsTemp = {};
    try {
      const selectedUsersArray = Object.values(selectedUsers);
      for (let i = 0; i < selectedUsersArray.length; i++) {
        const userName = selectedUsersArray[i];
        const q = query(collection(firestore, 'projectscheduler'), where('name', '==', userName), where('purpose', '==', purpose));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          slots.push(doc.data().timeSlots);
          purposes.push(doc.data().purpose);
          emailsTemp[`email${i + 1}`] = doc.data().email;
        });
      }

      setEmails(emailsTemp);

      if (purposes.every(p => p === purpose)) {
        const commonSlots = slots.reduce((a, b) => a.filter(c => b.includes(c)));
        const commonSlotResult = commonSlots.length ? commonSlots[0] : 'No common slot found';
        setCommonSlot(commonSlotResult);

        if (commonSlotResult !== 'No common slot found') {
          setTimeout(() => {
            sendEmail(commonSlotResult, emailsTemp.email1, 'template_m8ootgf');
            sendEmail(commonSlotResult, emailsTemp.email2, 'template_m8ootgf');
            sendEmail(commonSlotResult, emailsTemp.email3, 'template_m8ootgf');
          }, 1000);
        }
      } else {
        setCommonSlot('No common slot found');
      }
    } catch (error) {
      console.error("Error finding common time slot: ", error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="compare-slots-container">
        <h2>Check for common Time Slots</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Teacher 1:</label>
            <select name="user1" value={selectedUsers.user1} onChange={handleChange} required>
              <option value="">Select a teacher</option>
              {users.map(user => (
                <option key={user.id} value={user.name}>{user.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Teacher 2:</label>
            <select name="user2" value={selectedUsers.user2} onChange={handleChange} required>
              <option value="">Select a teacher</option>
              {users.map(user => (
                <option key={user.id} value={user.name}>{user.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Teacher 3:</label>
            <select name="user3" value={selectedUsers.user3} onChange={handleChange} required>
              <option value="">Select a teacher</option>
              {users.map(user => (
                <option key={user.id} value={user.name}>{user.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Purpose:</label>
            <select value={purpose} onChange={handlePurposeChange} required>
              <option value="">Select a purpose</option>
              <option value="mini project evaluation">Mini Project Evaluation</option>
              <option value="ly project evaluation">LY Project Evaluation</option>
              <option value="sem long internship evaluation">Sem Long Internship Evaluation</option>
            </select>
          </div>
          <button type="submit">Find Common Slot</button>
        </form>
        <br/>
        {commonSlot && <p>Common time slot: {commonSlot}</p>}
      </div>
    </div>
  );
};

export default CompareTimeSlots;
