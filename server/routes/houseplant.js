const express = require("express");
const axios = require("axios");

var router = express.Router();
const BASE_URL = "https://house-plants2.p.rapidapi.com/";
const HEADERS = {
  "X-RapidAPI-Key": process.env.PLANT_API_KEY,
  "X-RapidAPI-Host": "house-plants2.p.rapidapi.com",
};

// gets all plants
router.get("/", (req, res) => {
  axios
    .get(BASE_URL, { headers: HEADERS })
    .then((response) => {
      res.json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

// get plant by id
router.get("/id/", (req, res) => {
  axios
    .get(`${BASE_URL}${req.cookies.plantID}`, { headers: HEADERS })
    .then((response) => {
      const fields = [
        "img",
        "Latin name",
        "Common name",
        "Family",
        "Light ideal",
        "Light tolered",
        "Watering",
      ];
      const data = Object.keys(response.data)
        .filter((key) => fields.includes(key))
        .reduce((obj, key) => {
          obj[key] = response.data[key];
          return obj;
        }, {});
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(404);
    });
});

module.exports = router;