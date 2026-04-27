const { getCache, setCache } = require("../config/redis");

// Simulated hotel inventory (in a real app: call an external API like Amadeus)
const MOCK_HOTELS = [
  { id: "h1", name: "The Grand Palace", location: "Paris", rating: 4.8, pricePerNight: 220, image: "🏨", amenities: ["WiFi", "Pool", "Spa"] },
  { id: "h2", name: "Ocean View Resort", location: "Goa", rating: 4.5, pricePerNight: 95, image: "🏖️", amenities: ["WiFi", "Beach", "Restaurant"] },
  { id: "h3", name: "City Centre Suites", location: "London", rating: 4.2, pricePerNight: 180, image: "🏙️", amenities: ["WiFi", "Gym", "Bar"] },
  { id: "h4", name: "Mountain Escape Lodge", location: "Manali", rating: 4.6, pricePerNight: 75, image: "🏔️", amenities: ["WiFi", "Fireplace", "Trekking"] },
  { id: "h5", name: "Sakura Boutique Hotel", location: "Tokyo", rating: 4.9, pricePerNight: 310, image: "🗼", amenities: ["WiFi", "Onsen", "Concierge"] },
  { id: "h6", name: "Desert Oasis Resort", location: "Dubai", rating: 4.7, pricePerNight: 280, image: "🌴", amenities: ["WiFi", "Pool", "Camel Rides"] },
];

const MOCK_FLIGHTS = [
  { id: "f1", airline: "Air India", from: "DEL", to: "BOM", departure: "06:00", duration: "2h 10m", price: 4500, seats: 23, class: "economy" },
  { id: "f2", airline: "IndiGo", from: "BLR", to: "DEL", departure: "09:30", duration: "2h 45m", price: 3800, seats: 8, class: "economy" },
  { id: "f3", airline: "Emirates", from: "HYD", to: "DXB", departure: "13:45", duration: "3h 30m", price: 18000, seats: 4, class: "business" },
  { id: "f4", airline: "Vistara", from: "CCU", to: "BLR", departure: "16:20", duration: "2h 30m", price: 5200, seats: 15, class: "economy" },
  { id: "f5", airline: "Air France", from: "DEL", to: "CDG", departure: "22:00", duration: "8h 45m", price: 52000, seats: 2, class: "business" },
];

const searchHotels = async (req, res, next) => {
  try {
    const { location = "", checkIn, checkOut, guests = 1 } = req.query;
    const cacheKey = `search:hotels:${location.toLowerCase()}:${guests}`;

    const cached = await getCache(cacheKey);
    if (cached) return res.json({ data: cached, source: "cache" });

    let results = MOCK_HOTELS;
    if (location) {
      results = results.filter((h) =>
        h.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Simulate availability price adjustment based on guest count
    results = results.map((h) => ({
      ...h,
      totalPrice: h.pricePerNight * Math.max(1, Math.ceil(guests / 2)),
    }));

    await setCache(cacheKey, results, 300); // cache 5 min
    res.json({ data: results, source: "db" });
  } catch (err) { next(err); }
};

const searchFlights = async (req, res, next) => {
  try {
    const { from = "", to = "" } = req.query;
    const cacheKey = `search:flights:${from.toUpperCase()}:${to.toUpperCase()}`;

    const cached = await getCache(cacheKey);
    if (cached) return res.json({ data: cached, source: "cache" });

    let results = MOCK_FLIGHTS;
    if (from) results = results.filter((f) => f.from.toLowerCase() === from.toLowerCase());
    if (to) results = results.filter((f) => f.to.toLowerCase() === to.toLowerCase());

    await setCache(cacheKey, results, 60); // cache 1 min (flight prices change fast)
    res.json({ data: results, source: "db" });
  } catch (err) { next(err); }
};

module.exports = { searchHotels, searchFlights };
