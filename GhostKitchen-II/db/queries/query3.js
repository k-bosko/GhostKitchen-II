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
    const ratings = database.collection("ratings");

    const userID = 151;
    const query = { customer_id: userID };

    const ratingsCount = await ratings.countDocuments(query);

    console.log("*******************************************************");
    console.log(`Query 3: How many ratings did the user #${userID} leave?
      (Note: count documents requirement)`);
    console.log("*******************************************************");
    console.log(ratingsCount);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
