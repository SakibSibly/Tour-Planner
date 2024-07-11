const express = require('express');
const router = express.Router();
const HotelBookingHistory = require('../models/hotelBookingHistory');

router.post('/book', async (req, res) => {
  try {
    const { user, hotelName, place, checkInDate, checkOutDate, price, rating } = req.body;

    console.log('Booking Data Received:', req.body);

    // Validate data
    if (!user || !hotelName || !place || !checkInDate || !checkOutDate || !price || !rating) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create booking object
    const newBooking = new HotelBookingHistory({
      user,
      hotelName,
      place,
      checkInDate,
      checkOutDate,
      price,
      rating,
      review: null, // Initialize review as null or handle it as needed
      status: 'Booked' // Assuming 'Booked' as the default status
    });

    // Save booking
    const savedBooking = await newBooking.save();
    console.log('Booking saved successfully:', savedBooking);

    res.status(201).json({ message: 'Hotel booking successful', booking: savedBooking });
  } catch (error) {
    console.error('Error booking hotel:', error);
    res.status(500).json({ error: 'Failed to book hotel' });
  }
});

module.exports = router;