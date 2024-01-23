import React, { useState, useEffect } from 'react';
import { ItemList, FilterBar, CancelReservationModal } from './components'; // Import necessary components from the components folder
import { useAuth } from './utils/auth'; // Import a custom hook or library for authentication

function ReservedItems() {
  const [reservedItems, setReservedItems] = useState([]);
  const [filters, setFilters] = useState({ // Initial filter values
    name: '', // Filter by item name
    category: '', // Filter by item category
    date: '', // Filter by reservation date
  });
  const [selectedReservation, setSelectedReservation] = useState(null); // The reservation to be cancelled
  const [showCancelModal, setShowCancelModal] = useState(false); // Whether to show the cancellation modal
  const { user } = useAuth(); // Get the user object from the custom hook or library

  useEffect(() => {
    // Fetch data from backend or other sources, applying filters if needed
    fetch('/api/reserved-items', { // Add query parameters based on filters
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(filters)
    })
      .then(response => response.json())
      .then(data => setReservedItems(data));
  }, [filters]);

  // Add functions for handling user interactions (e.g., canceling reservations)
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleCancel = (reservationId) => {
    // Handle cancellation logic
    // Find the reservation by id and set it as the selected reservation
    const reservation = reservedItems.find(r => r.id === reservationId);
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
        const newReservedItems = reservedItems.filter(r => r.id !== selectedReservation.id);
        setReservedItems(newReservedItems);
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
    <div className="reserved-items">
      <h1>Reserved Items</h1>
      {/* Add filtering options if applicable */}
      <FilterBar filters={filters} onFilterChange={handleFilterChange} />
      <ItemList items={reservedItems} onCancel={handleCancel} />
      {/* Add modal for cancelling reservations */}
      {showCancelModal && <CancelReservationModal reservation={selectedReservation} onConfirm={handleCancelConfirm} onCancel={handleCancelCancel} />}
    </div>
  );
}

export default ReservedItems;
