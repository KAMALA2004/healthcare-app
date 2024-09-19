import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Calendar styles
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

const localizer = momentLocalizer(moment);

const AppointmentManagement = () => {
  const [availability, setAvailability] = useState([]); // Doctor's available slots
  const [selectedSlot, setSelectedSlot] = useState(null); // Current selected slot
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [blockReason, setBlockReason] = useState(''); // Block reason (personal time, meeting)

  useEffect(() => {
    // Fetch available slots from Firebase when component mounts
    const fetchAvailability = async () => {
      try {
        const response = await fetch('https://healthcare-app-5c517-default-rtdb.firebaseio.com/doctorAvailability.json');
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
    setSelectedSlot({ start, end });
    setIsModalOpen(true); // Open modal to confirm availability/block
  };

  // Confirm the selected slot as available or blocked
  const confirmAvailability = async (isBlock) => {
    const newSlot = {
      start: selectedSlot.start,
      end: selectedSlot.end,
      title: isBlock ? `Blocked (${blockReason})` : 'Available',
      isBlocked: isBlock,
    };

    try {
      // Save to Firebase
      await saveAvailabilityToFirebase(newSlot);

      // Update local state
      setAvailability((prev) => [...prev, newSlot]);

      setIsModalOpen(false); // Close modal
    } catch (error) {
      console.error('Error confirming availability:', error);
    }
  };

  // Function to save the doctor's availability to Firebase using fetch API
  const saveAvailabilityToFirebase = async (slot) => {
    try {
      const response = await fetch('https://healthcare-app-5c517-default-rtdb.firebaseio.com/doctorAvailability.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(slot),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      console.log('Slot saved to Firebase');
    } catch (error) {
      console.error('Error saving to Firebase:', error);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h2>Manage Your Appointments</h2>
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
            backgroundColor: event.isBlocked ? 'lightcoral' : 'lightgreen',
          },
        })}
        views={['day', 'week', 'month']}
      />

      {/* Modal for confirming availability or blocking time */}
      {selectedSlot && (
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <Box className="modal-box" sx={{ p: 3, bgcolor: 'background.paper', boxShadow: 24 }}>
            <Typography variant="h6">Set Availability or Block Time</Typography>
            <Typography>
              From: {moment(selectedSlot.start).format('LLLL')} <br />
              To: {moment(selectedSlot.end).format('LLLL')}
            </Typography>
            <TextField
              label="Block Reason (if blocking)"
              variant="outlined"
              fullWidth
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              sx={{ my: 2 }}
            />
            <Button variant="contained" color="primary" onClick={() => confirmAvailability(false)}>
              Confirm Availability
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => confirmAvailability(true)}
              sx={{ ml: 2 }}
            >
              Block Time
            </Button>
            <Button variant="outlined" onClick={handleCloseModal} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default AppointmentManagement;
