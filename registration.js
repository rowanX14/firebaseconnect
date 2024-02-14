
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {db} from  './firebase'

import {at} from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';


function Registration() {
  const [formData, setFormData] = useState({
    agencyName: '',
    address: '',
    contacts: '',
    id: '',
    latitude: '',
    longitude: '',
    equipmentList: '',
    password: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    try {
    
      await db.collection('RescueAgencies').doc(formData.id).set(formData);
      console.log('Document written with ID: ',formData.id);
      
              const usc=await createUserWithEmailAndPassword(at,formData.id,formData.password)
              console.log(usc);
              const user=usc.user;
              localStorage.setItem('token',user.accessToken);
              localStorage.setItem('user',JSON.stringify(user))
            alert("Form has been submitted")
      
      navigate('/login');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      <h1>Registration Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Agency Name:
          <input type="text" name="agencyName" value={formData.agencyName} onChange={handleChange} autoComplete="off" />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={formData.address} onChange={handleChange} autoComplete="off" />
        </label>
        <label>
          Contacts:
          <input type="text" name="contacts" value={formData.contacts} onChange={handleChange} autoComplete="off" />
        </label>
        <label>
         EMAIL ID:
          <input type="text" name="id" value={formData.id} onChange={handleChange} autoComplete="off" />
        </label>
        <label>
          Latitude:
          <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} autoComplete="off" />
        </label>
        <label>
          Longitude:
          <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} autoComplete="off" />
        </label>
        <label>
          Emergency Equipment List:
          <textarea name="equipmentList" value={formData.equipmentList} onChange={handleChange} autoComplete="off"></textarea>
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        {passwordError && <p>{passwordError}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Registration;

