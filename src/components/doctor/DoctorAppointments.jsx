// src/components/doctor/DoctorAppointments.jsx
import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebaseConfig';
import '../../styles/doctor/DoctorAppointments.css';

const DoctorAppointments = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const appointmentsQuery = query(
      collection(firestore, 'appointments'),
      where('doctorId', '==', doctorId)
    );

    const unsubscribe = onSnapshot(appointmentsQuery, (snapshot) => {
      const appointmentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAppointments(appointmentsData);
    }, (error) => {
      console.error("Error fetching appointments: ", error);
    });

    return () => unsubscribe();
  }, [doctorId]);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const appointmentRef = doc(firestore, 'appointments', appointmentId);
      await updateDoc(appointmentRef, { status });
      alert(`Appointment ${status}`);
    } catch (error) {
      console.error("Error updating appointment status: ", error);
      alert("Failed to update appointment status.");
    }
  };

  return (
    <div className="doctor-appointments">
      <h2>Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        <ul>
          {appointments.map(appointment => (
            <li key={appointment.id} className="appointment-item">
              <div>
                <strong>Patient:</strong> {appointment.patientName}
              </div>
              <div>
                <strong>Time:</strong> {new Date(appointment.time).toLocaleString()}
              </div>
              <div>
                <strong>Status:</strong> {appointment.status}
              </div>
              {appointment.status === 'Pending' && (
                <div className="appointment-actions">
                  <button onClick={() => handleUpdateStatus(appointment.id, 'Accepted')}>Accept</button>
                  <button onClick={() => handleUpdateStatus(appointment.id, 'Rejected')}>Reject</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorAppointments;
