// Load environment variables from the .env file into process.env
require("dotenv").config();

// Setup express
const express = require("express");
const app = express();
app.use(express.json());

// Setup Stripe
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// This is the list of items we are selling
// This will most likely come from a database or JSON file
const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 15000, name: "Learn CSS Today" }],
]);

// Start up our server on port 3000
app.listen(3000);
