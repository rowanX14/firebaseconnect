
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app'; 
import 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 
import { db } from './firebase';

function AgencyDetails() {
  const [agencyDetails, setAgencyDetails] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate(); 
  useEffect(() => {
  
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const fetchAgencyDetails = async () => {
      
        try {
          const querySnapshot = await db.collection('RescueAgencies').where('id', '==', currentUser.email).get();
          querySnapshot.forEach(doc => {
            setAgencyDetails(doc.data());
          });
        } catch (error) {
          console.error('Error getting documents:', error);
        }
      };
  
      fetchAgencyDetails();
    }, [currentUser]);

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut(); 
      navigate('/'); 
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      <h1>Rescue Agency Details Page</h1>
      {currentUser ? (
        <>
          <p>Agency Name: {agencyDetails.agencyName}</p>
          <p>Address: {agencyDetails.address}</p>
          <p>contacts: {agencyDetails.contacts}</p>
          <p>id: {agencyDetails.id}</p>
          <p>latitude: {agencyDetails.latitude}</p>
          <p>longitude: {agencyDetails.longitude}</p>
          <p>equipmentList: {agencyDetails.equipmentList}</p>
          
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Please sign in to view agency details.</p>
      )}
    </div>
  );
}

export default AgencyDetails;
