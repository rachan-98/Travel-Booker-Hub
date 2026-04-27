import axios from "axios";

const api = axios.create({ baseURL: "/api" });

// Search
export const searchHotels = (params) => api.get("/search/hotels", { params });
export const searchFlights = (params) => api.get("/search/flights", { params });

// Bookings (authenticated)
export const getBookings = () => api.get("/bookings");
export const getBooking = (id) => api.get(`/bookings/${id}`);
export const createBooking = (data) => api.post("/bookings", data);
export const cancelBooking = (id) => api.delete(`/bookings/${id}`);

export default api;
