// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorAvailability from './components/doctor/DoctorAvailability';
import DoctorAppointments from './components/doctor/DoctorAppointments';
import DoctorCard from './components/doctor/DoctorCard'; // Add if needed
import ViewDoctorAvailability from './components/patient/ViewDoctorAvailability'; // Add if this needs to be accessible from doctor side
import BookAppointment from './components/patient/BookAppointment'; // Add if this needs to be accessible from doctor side
import PatientAppointments from './components/patient/PatientAppointments'; // Add if this needs to be accessible from doctor side

function App() {
  return (
    <Router>
      <Routes>
        {/* Doctor-related routes */}
        <Route path="/" element={<DoctorAvailability doctorId="exampleDoctorId" />} />
        <Route path="/appointments" element={<DoctorAppointments doctorId="exampleDoctorId" />} />
        <Route path="/doctor-card" element={<DoctorCard />} />
        
        {/* Patient-related routes if needed */}
        <Route path="/view-availability" element={<ViewDoctorAvailability />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/patient-appointments" element={<PatientAppointments />} />
      </Routes>
    </Router>
  );
}

export default App;
