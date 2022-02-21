#!/usr/bin/env node

//Written by Katerina Bosko

const { MongoClient } = require("mongodb");

const uri = "mongodb://0.0.0.0:27017/";
// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    const database = client.db("GhostKitchen");
    const ratings = database.collection("ratings");

    const query = [
      {
        $group: {
          _id: "$customer_id",
          numRatings: {
            $count: {},
          },
        },
      },
      {
        $sort: {
          numRatings: -1,
        },
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "id",
          as: "join",
        },
      },
      {
        $unwind: {
          path: "$join",
        },
      },
      {
        $project: {
          "join.first_name": 1,
          "join.last_name": 1,
          numRatings: 1,
        },
      },
      {
        $addFields: {
          "join.numRatings": "$numRatings",
        },
      },
      {
        $replaceRoot: {
          newRoot: "$join",
        },
      },
    ];

    const ratingsCount = await ratings.aggregate(query).toArray();

    console.log("*******************************************************");
    console.log(`Query 3: What are the top 5 users that left the largest number of ratings?
      (Note: count documents requirement)`);
    console.log("*******************************************************");
    console.log("Customer - Number of Ratings");
    for await (const rating of ratingsCount) {
      console.log(rating.first_name, rating.last_name, "-", rating.numRatings);
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
