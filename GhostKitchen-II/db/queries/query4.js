#!/usr/bin/env node

//Written by Katerina Bosko

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";
// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    const database = client.db("GhostKitchen");
    const customers = database.collection("customers");
    const ratings = database.collection("ratings");

    //query params
    const userFirstName = "Tildy";
    const userLastName = "Downey";
    const meal = "Burger Special";
    const newRating = 5;

    const customer = await customers.findOne({
      first_name: "Tildy",
      last_name: "Downey",
    });

    const filter = {
      customer_id: customer.id,
      meal_name: "Burger Special",
    };

    const update = {
      $set: {
        rating: newRating,
      },
    };

    console.log("*******************************************************");
    console.log(
      `Query 4: Update the rating left by ${userFirstName} ${userLastName} for ${meal}`
    );
    console.log("*******************************************************");
    console.log("Customer:", customer);
    console.log("Current rating:", await ratings.findOne(filter));

    await ratings.updateOne(filter, update);

    console.log("Updated rating:", await ratings.findOne(filter));
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
