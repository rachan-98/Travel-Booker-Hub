const express = require("express");
const { getUserBookings, getBookingById, createBooking, cancelBooking } = require("../controllers/booking.controller");

const router = express.Router();

router.get("/", getUserBookings);
router.get("/:id", getBookingById);
router.post("/", createBooking);
router.delete("/:id", cancelBooking);

module.exports = router;
