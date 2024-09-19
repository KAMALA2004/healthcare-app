import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import '../../styles/doctor/ProfilePage.css';

const ProfilePage = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('https://healthcare-app-5c517-default-rtdb.firebaseio.com/doctors.json');
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                
                // Convert the object to an array
                const profilesArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
                
                setProfiles(profilesArray);
            } catch (err) {
                setError('Error fetching profiles data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="profile-page">
            <h2>Profiles</h2>
            <Link to="/a" className="dashboard-link">Go to Dashboard</Link> {/* Add this link */}
            
            {profiles.length > 0 ? (
                <>
                    {profiles.map(profile => (
                        <div key={profile.id} className="profile-details">
                            <div className="profile-info">
                                <h3>{profile.name}</h3>
                                <p className="subtitle">{profile.specialization}</p>
                                <p><strong>Bio:</strong> {profile.bio}</p>
                                <p><strong>Gender:</strong> {profile.gender}</p>
                                <p><strong>Qualification:</strong> {profile.qualification}</p>
                                <p><strong>Experience:</strong> {profile.experience} years</p>
                                <p><strong>Clinic Address:</strong> {profile.clinicAddress}</p>
                                <p><strong>Consultation Fee:</strong> ${profile.consultationFee}</p>
                                <p><strong>Consultation Types:</strong> {profile.consultationTypes.join(', ')}</p>
                                <p><strong>Working Hours:</strong> {profile.workingHours.from} to {profile.workingHours.to}</p>
                                <p><strong>Available Days:</strong> {profile.availableDays.join(', ')}</p>
                                <p><strong>LinkedIn Profile:</strong> <a href={profile.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">{profile.socialMedia.linkedin}</a></p>
                                <p><strong>Website:</strong> <a href={profile.socialMedia.website} target="_blank" rel="noopener noreferrer">{profile.socialMedia.website}</a></p>
                            </div>
                            <img 
                                src={profile.profilePhoto || 'default-profile-photo.jpg'} // Handle case when profile photo is not available
                                alt="Profile"
                                className="profile-photo" 
                            />
                        </div>
                    ))}
                </>
            ) : (
                <p className="no-profiles">No profiles available.</p>
            )}
        </div>
    );
};

export default ProfilePage;
