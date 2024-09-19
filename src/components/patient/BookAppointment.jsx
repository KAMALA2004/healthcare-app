import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Calendar styles
import { Modal, Box, Typography, Button } from '@mui/material'; // Modal components
import '../../styles/patient/BookAppointment.css';

const localizer = momentLocalizer(moment);

const BookAppointment = () => {
  const [availability, setAvailability] = useState([]); // Doctor's available slots
  const [selectedSlot, setSelectedSlot] = useState(null); // Selected slot for booking
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  useEffect(() => {
    // Fetch available slots from Firebase when component mounts
    const fetchAvailability = async () => {
      try {
        const response = await fetch('https://healthcare-app-5c517-default-rtdb.firebaseio.com/doctorAvailability.json'); // Replace with your real URL
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        // Format the data into an array of events
        const formattedAvailability = Object.keys(data).map(key => ({
          ...data[key],
          id: key,
          start: new Date(data[key].start),
          end: new Date(data[key].end),
        }));

        setAvailability(formattedAvailability);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAvailability();
  }, []);

  const handleSelectSlot = ({ start, end }) => {
    console.log('Selected Slot:', { start, end }); // Debug log
    setSelectedSlot({ start, end });
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedSlot) return;

    // Example booking data
    const bookingData = {
      ...selectedSlot,
      title: 'Booked Appointment',
      isBooked: true, // Indicate that this slot is booked
    };

    try {
      const response = await fetch('https://healthcare-app-5c517-default-rtdb.firebaseio.com/doctorAvailability.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      alert('Appointment is fixed'); // Display confirmation message
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error confirming booking:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Book Your Appointment</h2>
      <Calendar
        localizer={localizer}
        selectable
        events={availability}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={handleSelectSlot}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.isBooked ? 'lightcoral' : 'lightgreen',
          },
        })}
        views={['day', 'week', 'month']}
      />

      {/* Modal for confirming the booking */}
      {selectedSlot && (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box className="modal-overlay">
            <Box className="modal-box">
              <Typography className="modal-header" variant="h6">Confirm Your Booking</Typography>
              <Typography className="modal-body">
                From: {moment(selectedSlot.start).format('LLLL')} <br />
                To: {moment(selectedSlot.end).format('LLLL')}
              </Typography>
              <Box className="modal-buttons">
                <Button variant="contained" color="primary" onClick={handleConfirmBooking}>
                  Confirm Booking
                </Button>
                <Button variant="outlined" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default BookAppointment;