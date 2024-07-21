import React, { useState } from 'react';
import './form.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const db = getFirestore();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store the user's name in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
      });

      alert("User registered successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='wrapper'>
      <div className='form-box login'>
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          
          <div className='input-box'>
            <MdDriveFileRenameOutline className='icon' />
            <input type='text' placeholder='Name' name='name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className='input-box'>
            <MdEmail className='icon' />
            <input type='email' placeholder='Email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='input-box'>
            <FaLock className='icon' />
            <input type='password' placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type='submit'>Sign Up</button>
        </form>
      </div>
      <div className="register-link">
        <p>Already have an account? <Link to="/LoginForm">Login</Link></p>
      </div>
    </div>
  )
}

export default RegisterForm;
