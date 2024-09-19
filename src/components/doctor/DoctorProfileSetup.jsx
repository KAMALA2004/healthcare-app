import React, { useState } from 'react';
import '../../styles/doctor/DoctorProfileSetup.css';
import { useNavigate } from 'react-router-dom';

const DoctorProfileSetup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [experience, setExperience] = useState('');
    const [clinicAddress, setClinicAddress] = useState('');
    const [consultationFee, setConsultationFee] = useState('');
    const [consultationTypes, setConsultationTypes] = useState([]);
    const [bio, setBio] = useState('');
    const [qualification, setQualification] = useState('');
    const [languages, setLanguages] = useState([]);
    const [licenseNumber, setLicenseNumber] = useState('');
    const [socialMedia, setSocialMedia] = useState({ linkedin: '', website: '' });
    const [workingHours, setWorkingHours] = useState({ from: '', to: '' });
    const [availableDays, setAvailableDays] = useState([]);
    const [photo, setPhoto] = useState(null); // State to store the photo

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file));
        }
    };

    const handleConsultationTypeChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setConsultationTypes([...consultationTypes, value]);
        } else {
            setConsultationTypes(consultationTypes.filter((type) => type !== value));
        }
    };

    const handleAvailableDaysChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setAvailableDays([...availableDays, value]);
        } else {
            setAvailableDays(availableDays.filter((day) => day !== value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const profileData = {
            name,
            gender,
            specialization,
            experience,
            clinicAddress,
            consultationFee,
            consultationTypes,
            bio,
            qualification,
            languages,
            licenseNumber,
            socialMedia,
            workingHours,
            availableDays,
            photo // Add photo to the profile data
        };

        try {
            const response = await fetch('https://healthcare-app-5c517-default-rtdb.firebaseio.com/doctors.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });

            if (response.ok) {
                console.log('Profile stored successfully!');
                navigate('/profile'); // Redirect to profile page after successful submission
            } else {
                throw new Error('Failed to store profile.');
            }
        } catch (error) {
            console.error("Error storing profile: ", error);
            alert("Failed to store profile.");
        }
    };

    return (
        <div className="doctor-profile-setup">
            <h2>Complete Your Profile</h2>
            <form onSubmit={handleSubmit}>
                {/* Personal Information Section */}
                <section>
                    <h3>Personal Information</h3>
                    <label>Profile Photo:
                        <input type="file" onChange={handlePhotoUpload} />
                        {photo && <img src={photo} alt="Profile" style={{ width: '100px', height: '100px' }} />}
                    </label>

                    <label>Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </label>

                    <label>Gender:</label>
                    <div className="gender-options">
                        <label>
                            <input type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} required />
                            Male
                        </label>
                        <label>
                            <input type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} required />
                            Female
                        </label>
                        <label>
                            <input type="radio" name="gender" value="Other" onChange={(e) => setGender(e.target.value)} required />
                            Other
                        </label>
                    </div>

                    {/* Languages Spoken Field */}
                    <label>Languages Spoken:</label>
                    <div className="languages-options">
                        {['English', 'Tamil', 'Telugu', 'Hindi', 'Malayalam', 'Marati'].map((language) => (
                            <label key={language}>
                                <input
                                    type="checkbox"
                                    value={language}
                                    onChange={(e) => {
                                        const { value, checked } = e.target;
                                        if (checked) {
                                            setLanguages([...languages, value]);
                                        } else {
                                            setLanguages(languages.filter((lang) => lang !== value));
                                        }
                                    }}
                                />
                                {language}
                            </label>
                        ))}
                    </div>
                </section>

                {/* Professional Details Section */}
                <section>
                    <h3>Professional Details</h3>
                    <label>Specialization:
                        <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
                    </label>

                    <label>Qualification:
                        <input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} required />
                    </label>

                    <label>Years of Experience:
                        <input type="number" value={experience} onChange={(e) => setExperience(e.target.value)} required />
                    </label>

                    {/* Medical License Number Moved Here */}
                    <label>Medical License Number:
                        <input type="text" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} required />
                    </label>
                </section>

                {/* Consultation Information Section */}
                <section>
                    <h3>Consultation Information</h3>
                    <label>Clinic Address:
                        <textarea value={clinicAddress} onChange={(e) => setClinicAddress(e.target.value)} required></textarea>
                    </label>

                    <label>Consultation Fee:
                        <input type="number" value={consultationFee} onChange={(e) => setConsultationFee(e.target.value)} required />
                    </label>

                    <label>Consultation Types:</label>
                    <div className="consultation-options">
                        <label>
                            <input type="checkbox" value="In-Person" onChange={handleConsultationTypeChange} />
                            In-Person
                        </label>
                        <label>
                            <input type="checkbox" value="Online" onChange={handleConsultationTypeChange} />
                            Online
                        </label>
                    </div>

                    <label>Working Hours:
                        <input type="time" value={workingHours.from} onChange={(e) => setWorkingHours({ ...workingHours, from: e.target.value })} /> 
                        to 
                        <input type="time" value={workingHours.to} onChange={(e) => setWorkingHours({ ...workingHours, to: e.target.value })} />
                    </label>

                    <label>Available Days:</label>
                    <div className="available-days">
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                            <label key={day}>
                                <input type="checkbox" value={day} onChange={handleAvailableDaysChange} />
                                {day}
                            </label>
                        ))}
                    </div>

                    <label>Bio:
                        <textarea value={bio} onChange={(e) => setBio(e.target.value)} required></textarea>
                    </label>

                    <label>LinkedIn Profile:
                        <input type="url" value={socialMedia.linkedin} onChange={(e) => setSocialMedia({ ...socialMedia, linkedin: e.target.value })} />
                    </label>

                    <label>Website (if any):
                        <input type="url" value={socialMedia.website} onChange={(e) => setSocialMedia({ ...socialMedia, website: e.target.value })} />
                    </label>
                </section>

                <button type="submit">Save Profile</button>
            </form>
        </div>
    );
};

export default DoctorProfileSetup;
