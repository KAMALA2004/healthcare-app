// src/components/doctor/DoctorAvailability.jsx
import React, { useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebaseConfig';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/doctor/DoctorAvailability.css';
const DoctorAvailability = ({ doctorId }) => {
  const [availableTimes, setAvailableTimes] = useState([]);

  const handleDateChange = (date) => {
    if (date) {
      setAvailableTimes([...availableTimes, date]);
    }
  };

  const removeTimeSlot = (index) => {
    setAvailableTimes(availableTimes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const doctorRef = doc(collection(firestore, 'doctors'), doctorId);
      await setDoc(doctorRef, {
        availableTimes: availableTimes.map(date => date.toISOString())
      }, { merge: true });
      alert("Availability updated!");
      setAvailableTimes([]);
    } catch (error) {
      console.error("Error updating availability: ", error);
      alert("Failed to update availability.");
    }
  };

  return (
    <div className="doctor-availability">
      <h2>Set Available Time Slots</h2>
      <form onSubmit={handleSubmit}>
        <DatePicker
          selected={null}
          onChange={handleDateChange}
          showTimeSelect
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Select a time slot"
          minDate={new Date()}
          isClearable
        />
        <button type="submit">Save Availability</button>
      </form>
      
      {availableTimes.length > 0 && (
        <ul>
          {availableTimes.map((time, index) => (
            <li key={index}>
              {time.toLocaleString()} 
              <button type="button" onClick={() => removeTimeSlot(index)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorAvailability;
