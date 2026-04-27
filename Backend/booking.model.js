const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["hotel", "flight"], required: true },

  // Hotel fields
  hotelName: String,
  location: String,
  roomType: { type: String, enum: ["standard", "deluxe", "suite"] },

  // Flight fields
  airline: String,
  flightNumber: String,
  from: String,
  to: String,
  seatClass: { type: String, enum: ["economy", "business", "first"] },

  // Common
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, default: 1, min: 1 },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["confirmed", "pending", "cancelled"],
    default: "confirmed"
  },
}, { timestamps: true });

// Index for fast user-based lookups
bookingSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model("Booking", bookingSchema);
