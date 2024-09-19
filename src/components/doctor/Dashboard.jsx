import React from 'react';
import { useNavigate } from 'react-router-dom'; // Update to useNavigate
//import '../styles/doctor/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate(); // Updated hook

    const handleNavigation = (path) => {
        navigate(path); // Updated navigation method
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Doctor's Dashboard</h1>
                <div className="header-buttons">
                    <button onClick={() => handleNavigation('/notifications')} className="header-button">Notifications</button>
                    <button onClick={() => handleNavigation('/profile-management')} className="header-button">Profile Management</button>
                </div>
            </header>
            <div className="dashboard-content">
                <div className="dashboard-box" onClick={() => handleNavigation('/appointments')}>
                    <h3>Appointment Management</h3>
                </div>
                <div className="dashboard-box" onClick={() => handleNavigation('/patient-data')}>
                    <h3>Patient Data Management</h3>
                </div>
                <div className="dashboard-box" onClick={() => handleNavigation('/telemedicine')}>
                    <h3>Telemedicine</h3>
                </div>
                <div className="dashboard-box" onClick={() => handleNavigation('/analytics')}>
                    <h3>Analytics and Reporting</h3>
                </div>
                <div className="dashboard-box" onClick={() => handleNavigation('/notifications')}>
                    <h3>Notifications</h3>
                </div>
                <div className="dashboard-box" onClick={() => handleNavigation('/profile-management')}>
                    <h3>Profile Management</h3>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
