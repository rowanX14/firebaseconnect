
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { at } from './firebase'; 
import {signInWithEmailAndPassword} from 'firebase/auth'

function Login() {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await signInWithEmailAndPassword(at,credentials.id, credentials.password);
      navigate('/agency');
    } catch (error) {
      setError('Invalid ID or password');
      console.error('Error signing in: ', error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
         EMAIL ID:
          <input type="text" name="id" value={credentials.id} onChange={handleChange}  autoComplete="off"/>
        </label>
        <label>
          Password:
          <input type="password" name="password" value={credentials.password} onChange={handleChange} />
        </label>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Login;
