import React, { useState, useEffect } from 'react';
import { UserProfile, ItemList, ReservationList, CancelReservationModal } from './components'; // Import necessary components from the components folder

function ClientDashboard() {
  const [profile, setProfile] = useState(null);
  const [items, setItems] = useState([]);
  const [reservations, setReservations] = useState([]);
  // Add more state variables as needed
  const [selectedReservation, setSelectedReservation] = useState(null); // The reservation to be cancelled
  const [showCancelModal, setShowCancelModal] = useState(false); // Whether to show the cancellation modal

  useEffect(() => {
    // Fetch data from backend or other sources
    // Example using hypothetical API calls:
    fetch('/api/user/profile')
      .then(response => response.json())
      .then(data => setProfile(data));

    fetch('/api/items')
      .then(response => response.json())
      .then(data => setItems(data));

    fetch('/api/reservations')
      .then(response => response.json())
      .then(data => setReservations(data));
  }, []);

  const handleReservation = (itemId) => {
    // Handle reservation logic
    // Create a new reservation object with the user id, item id, and the current date and time
    const reservation = {
      userId: profile.id,
      itemId: itemId,
      date: new Date().toISOString()
    };
    // Post the reservation data to the backend and update the state
    fetch('/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reservation)
    })
      .then(response => response.json())
      .then(data => {
        // Add the new reservation to the state
        const newReservations = [...reservations, data];
        setReservations(newReservations);
      });
  };

  // Add more functions for handling other interactions
  const handleCancel = (reservationId) => {
    // Handle cancellation logic
    // Find the reservation by id and set it as the selected reservation
    const reservation = reservations.find(r => r.id === reservationId);
    setSelectedReservation(reservation);
    // Show the cancellation modal
    setShowCancelModal(true);
  };

  const handleCancelConfirm = () => {
    // Handle cancellation confirmation
    // Delete the reservation data from the backend and the state
    fetch(`/api/reservations/${selectedReservation.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        // Filter out the cancelled reservation from the state
        const newReservations = reservations.filter(r => r.id !== selectedReservation.id);
        setReservations(newReservations);
      });
    // Hide the cancellation modal
    setShowCancelModal(false);
  };

  const handleCancelCancel = () => {
    // Handle cancellation cancellation
    // Reset the selected reservation and hide the cancellation modal
    setSelectedReservation(null);
    setShowCancelModal(false);
  };

  return (
    <div className="client-dashboard">
      {/* Dashboard layout and components */}
      <h1>Client Dashboard</h1>
      <section>
        <h2>Your Profile</h2>
        <UserProfile profile={profile} />
      </section>
      <section>
        <h2>Available Items</h2>
        <ItemList items={items} onReserve={handleReservation} />
      </section>
      <section>
        <h2>Your Reservations</h2>
        <ReservationList reservations={reservations} onCancel={handleCancel} />
      </section>
      {/* Add more sections for other functionalities */}
      {/* Add modal for cancelling reservations */}
      {showCancelModal && <CancelReservationModal reservation={selectedReservation} onConfirm={handleCancelConfirm} onCancel={handleCancelCancel} />}
    </div>
  );
}

export default ClientDashboard;
