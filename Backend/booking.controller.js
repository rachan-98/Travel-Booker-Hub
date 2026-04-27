const Booking = require("../models/booking.model");
const { getCache, setCache, deleteCache } = require("../config/redis");

// GET /api/bookings — cached per user
const getUserBookings = async (req, res, next) => {
  try {
    const cacheKey = `bookings:user:${req.user.id}`;
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.json({ data: cached, source: "cache" });
    }

    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    await setCache(cacheKey, bookings, 120); // cache for 2 min

    res.json({ data: bookings, source: "db" });
  } catch (err) { next(err); }
};

// GET /api/bookings/:id
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
    if (!booking) return res.status(404).json({ error: "Booking not found." });
    res.json({ data: booking });
  } catch (err) { next(err); }
};

// POST /api/bookings
const createBooking = async (req, res, next) => {
  try {
    const { type, checkIn, checkOut, guests, totalPrice, ...rest } = req.body;

    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({ error: "Check-in must be before check-out." });
    }

    const booking = await Booking.create({
      user: req.user.id,
      type,
      checkIn,
      checkOut,
      guests,
      totalPrice,
      ...rest,
    });

    // Invalidate user's booking cache
    await deleteCache(`bookings:user:${req.user.id}`);

    res.status(201).json({ data: booking });
  } catch (err) { next(err); }
};

// DELETE /api/bookings/:id — cancel
const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user.id });
    if (!booking) return res.status(404).json({ error: "Booking not found." });
    if (booking.status === "cancelled") {
      return res.status(400).json({ error: "Booking is already cancelled." });
    }

    booking.status = "cancelled";
    await booking.save();

    await deleteCache(`bookings:user:${req.user.id}`);

    res.json({ message: "Booking cancelled successfully.", data: booking });
  } catch (err) { next(err); }
};

module.exports = { getUserBookings, getBookingById, createBooking, cancelBooking };
