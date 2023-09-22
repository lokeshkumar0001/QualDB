const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const Crypto = require("./mongoSchema");
const dotenv = require("dotenv")
const app = express();
const path = require('path');

app.use(express.json());

const port = process.env.PORT || 4000;

dotenv.config({path: 'backend/config.env'});

//connecting with the frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

//database connection
mongoose
  .connect(process.env.mognodbUrl)
  .then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  })
  .catch((error) => {
    console.log(error);
  });

// Fetch and store data from the WazirX API
async function fetchAndStoreCryptoData() {
  try {
    const response = await axios.get("https://api.wazirx.com/api/v2/tickers");

    // Extract the top 10 results
    const dataArray = Object.values(response.data);
    const top10Data = dataArray.slice(0, 10);
    // Store data in the database

    await Crypto.deleteMany({}); // Clear previous data
    await Crypto.insertMany(top10Data);
    console.log("Crypto data updated in the database");
  } catch (error) {
    console.error("Error fetching and storing crypto data:", error);
  }
}

// Fetch and store data on server start
fetchAndStoreCryptoData();

// Define a route to retrieve data from the database
app.get("/crypto", async (req, res) => {
  try {
    const cryptoData = await Crypto.find().limit(10);
    res.json(cryptoData);
  } catch (error) {
    console.error("Error fetching crypto data from the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
