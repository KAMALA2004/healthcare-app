// src/components/doctor/DoctorCard.jsx
import React from 'react';

const DoctorCard = ({ doctor, onSelect }) => {
  return (
    <div className="doctor-card" onClick={() => onSelect(doctor)}>
      <h3>{doctor.name}</h3>
      <p><strong>Specialty:</strong> {doctor.specialty}</p>
      <p><strong>Department:</strong> {doctor.department}</p>
      <p><strong>Available Times:</strong> {doctor.availableTimes?.map(time => new Date(time).toLocaleString()).join(', ') || 'No availability set'}</p>
    </div>
  );
};

export default DoctorCard;
