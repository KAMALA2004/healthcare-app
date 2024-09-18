// src/components/BookAppointment.js
import React, { useState } from 'react';
import { firestore } from '../../firebase/firebaseConfig';

const BookAppointment = ({ patientId }) => {
  const [doctorId, setDoctorId] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add new appointment to Firestore
    firestore.collection('appointments').add({
      doctorId,
      patientId,
      time,
      status: 'Pending' // Initial status is pending
    }).then(() => {
      alert("Appointment booked!");
      setDoctorId("");
      setTime("");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Doctor ID:</label>
      <input
        type="text"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
      />
      <label>Time Slot:</label>
      <input
        type="text"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default BookAppointment;
