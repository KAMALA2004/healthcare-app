// src/components/PatientAppointments.js
import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebaseConfig';

const PatientAppointments = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch appointments for this patient
    const unsubscribe = firestore.collection('appointments')
      .where('patientId', '==', patientId)
      .onSnapshot(snapshot => {
        const appointmentsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAppointments(appointmentsData);
      });

    return () => unsubscribe();
  }, [patientId]);

  return (
    <div>
      <h1>Your Appointments</h1>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            Appointment with Doctor {appointment.doctorId} - {appointment.time} ({appointment.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientAppointments;
