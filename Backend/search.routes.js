const express = require("express");
const { searchHotels, searchFlights } = require("../controllers/search.controller");

const router = express.Router();

router.get("/hotels", searchHotels);
router.get("/flights", searchFlights);

module.exports = router;
