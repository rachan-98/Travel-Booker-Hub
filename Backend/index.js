require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { connectDB } = require("./config/db");
const { connectRedis } = require("./config/redis");

const authRoutes = require("./routes/auth.routes");
const bookingRoutes = require("./routes/booking.routes");
const searchRoutes = require("./routes/search.routes");
const { errorHandler } = require("./middleware/error.middleware");
const { authMiddleware } = require("./middleware/auth.middleware");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// Public routes
app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);          // search is public

// Protected routes
app.use("/api/bookings", authMiddleware, bookingRoutes);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use(errorHandler);

const start = async () => {
  await connectDB();
  await connectRedis();
  app.listen(PORT, () => console.log(`Travel Booker Hub running on port ${PORT}`));
};

start();
module.exports = app;
