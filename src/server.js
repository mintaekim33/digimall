// Load environment variables from the .env file into process.env
require("dotenv").config();
var cors = require("cors");

// Setup express
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

// Setup Stripe
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// This is the list of items we are selling
// This will most likely come from a database or JSON file
const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 15000, name: "Learn CSS Today" }],
]);

app.post("/create-checkout-session", (req, res) => {
  // try {
  //   // const session = await stripe.checkout.sessions.create({
  //   //   payment_method_types
  //   // });
  //   // res.json({ url: session.url })
  // } catch (e) {
  //   res.status(500).json({ error: e.message });
  // }
  res.json({ url: "Hi" });
});

// Start up our server on port 3000
app.listen(3000);
