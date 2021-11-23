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
    const orders = database.collection("orders");

    const query = [
      {
        $group: {
          _id: "$meal_info.brand_name",
          revenue: {
            $sum: {
              $multiply: ["$meal_info.price", "$order_quantity"],
            },
          },
        },
      },
      {
        $sort: {
          revenue: -1,
        },
      },
    ];

    const revenuesPerBrand = await orders.aggregate(query).toArray();

    console.log("*******************************************************");
    console.log("Query 5: What is the revenue per virtual brand?");
    console.log("*******************************************************");
    console.log("Brand           | Revenue ($)");
    for await (const brand of revenuesPerBrand) {
      console.log(brand._id.padEnd(15), "|", brand.revenue.toFixed(2));
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
