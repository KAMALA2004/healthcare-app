// src/components/patient/UpcomingConsultations.jsx
import React, { useState, useEffect } from 'react';
import '../../styles/patient/UpcomingConsultations.css';

const UpcomingConsultations = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch booked appointments from Firebase or any other data source
    const fetchAppointments = async () => {
      try {
        const response = await fetch('https://healthcare-app-5c517-default-rtdb.firebaseio.com/doctorAvailability.json'); // Replace with your real URL
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        // Filter out the booked appointments
        const bookedAppointments = Object.keys(data).map(key => data[key])
          .filter(appointment => appointment.isBooked && new Date(appointment.end) > new Date());

        setAppointments(bookedAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="upcoming-consultations">
      <h2>Upcoming Consultations</h2>
      {appointments.length > 0 ? (
        <ul>
          {appointments.map((appointment, index) => (
            <li key={index}>
              <p>Date: {new Date(appointment.start).toLocaleDateString()}</p>
              <p>Time: {new Date(appointment.start).toLocaleTimeString()} - {new Date(appointment.end).toLocaleTimeString()}</p>
              <p>Doctor: {appointment.doctorName}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-appointments">No upcoming consultations...</p>
      )}
    </div>
  );
};

export default UpcomingConsultations;
