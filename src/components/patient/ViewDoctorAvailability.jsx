import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/firebaseConfig';
import DoctorCard from '../doctor/DoctorCard';
import DepartmentList from '../common/DepartmentList';
import DoctorAppointments from '../doctor/DoctorAppointments';

const ViewDoctorAvailability = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const departments = ['All', 'Cardiology', 'Dermatology', 'Orthopedics', 'Pediatrics']; // Example departments

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorsCollection = collection(firestore, 'doctors');
      const snapshot = await getDocs(doctorsCollection);
      const doctorsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDoctors(doctorsData);
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = selectedDepartment === 'All' 
    ? doctors 
    : doctors.filter(doctor => doctor.department === selectedDepartment);

  return (
    <div className="view-doctor-availability">
      <h1>Doctor Availability</h1>
      
      {/* Department Selection */}
      <DepartmentList 
        departments={departments} 
        selectedDepartment={selectedDepartment}
        onSelect={setSelectedDepartment}
      />

      {/* Doctor Cards */}
      <div className="doctor-cards">
        {filteredDoctors.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} onSelect={setSelectedDoctor} />
        ))}
      </div>

      {/* If a doctor is selected, show their appointments */}
      {selectedDoctor && (
        <div className="appointments-section">
          <h2>Appointments for Dr. {selectedDoctor.name}</h2>
          <DoctorAppointments doctorId={selectedDoctor.id} />
        </div>
      )}
    </div>
  );
};

export default ViewDoctorAvailability;
