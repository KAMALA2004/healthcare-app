// src/components/doctor/DoctorDashboard.jsx
import React from 'react';
import DoctorAvailability from './DoctorAvailability';
import DoctorAppointments from './DoctorAppointments';
import '../../styles/doctor/DoctorDashboard.css';

const DoctorDashboard = ({ doctorId }) => {
  return (
    <div className="doctor-dashboard">
      <h1>Doctor's Dashboard</h1>
      <div className="dashboard-sections">
        <div className="availability-section">
          <DoctorAvailability doctorId={doctorId} />
        </div>
        <div className="appointments-section">
          <DoctorAppointments doctorId={doctorId} />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
