import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/doctor/Dashboard';
import AppointmentManagement from './components/doctor/AppointmentManagement';
import PatientDataManagement from './components/doctor/PatientDataManagement';
import Telemedicine from './components/doctor/Telemedicine';
import AnalyticsAndReporting from './components/doctor/AnalyticsAndReporting';
import Notifications from './components/doctor/Notifications';
import ProfilePage from './components/doctor/ProfilePage';
import DoctorProfileSetup from './components/doctor/DoctorProfileSetup';
import BookAppointment from './components/patient/BookAppointment';
import UpcomingConsultations from './components/patient/UpcomingConsultations';
import Home from './components/patient/Home';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/a" element={<Dashboard />} />
                <Route path="/c" element={<AppointmentManagement />} />
                <Route path="/d" element={<PatientDataManagement />} />
                <Route path="/t" element={<Telemedicine />} />
                <Route path="/r" element={<AnalyticsAndReporting />} />
                <Route path="/n" element={<Notifications />} />
                <Route path="/" element={<DoctorProfileSetup />} />
                <Route path="/b" element={<ProfilePage />} />
                <Route path="/w" element={<BookAppointment />} />
                <Route path="/ph" element={<Home/>}/>
                <Route path="/uc" element={<UpcomingConsultations/>}/>
            </Routes>
        </Router>
    );
};

export default App;
