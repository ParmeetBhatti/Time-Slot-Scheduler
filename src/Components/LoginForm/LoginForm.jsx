import React, { useState } from 'react';
import './form.css';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import usePreventBack from '../usePreventBack';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  usePreventBack();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const db = getFirestore();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch the user's name from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userName = userDoc.data().name;
        // Store user data in sessionStorage
        sessionStorage.setItem('user', JSON.stringify({ email, name: userName }));
        navigate('/Dashboard');
      } else {
        console.log("No such document!");
      }
    } catch (err) {
      console.log(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className='wrapper'>
      <div className='form-box login'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className='input-box'>
            <input type='text' placeholder='Email' name='email' required onChange={(e) => setEmail(e.target.value)} />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Password' name='password' required onChange={(e) => setPassword(e.target.value)} />
            <FaLock className='icon' />
          </div>

          {/* <div className="remember-forgot">
            <label><input type='checkbox' />Remember me</label>
            <a href='#'>Forgot password?</a>
          </div> */}

          <button type='submit'>Login</button>

          <div className="register-link">
            <p>New user?<Link to="/RegisterForm"> Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
