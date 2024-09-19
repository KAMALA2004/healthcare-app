import React, { useState, useEffect } from 'react';
import '../../styles/doctor/PatientDataManagement.css';
const PatientDataManagement = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch('https://your-database-url/patients.json'); // Replace with your real URL
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setPatients(Object.keys(data).map(key => ({ id: key, ...data[key] })));
            } catch (err) {
                setError('Error fetching patients data');
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    if (loading) return <div>Loading patient data...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="patient-data-management">
            <h2>Patient Data Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Medical History</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => (
                        <tr key={patient.id}>
                            <td>{patient.name}</td>
                            <td>{patient.age}</td>
                            <td>{patient.medicalHistory}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientDataManagement;
