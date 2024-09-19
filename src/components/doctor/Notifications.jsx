import React, { useState, useEffect } from 'react';
import '../../styles/doctor/Notifications.css';
const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch('https://your-database-url/notifications.json'); // Replace with your real URL
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setNotifications(Object.keys(data).map(key => ({ id: key, ...data[key] })));
            } catch (err) {
                setError('Error fetching notifications data');
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    if (loading) return <div>Loading notifications...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="notifications">
            <h2>Notifications</h2>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id}>{notification.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
