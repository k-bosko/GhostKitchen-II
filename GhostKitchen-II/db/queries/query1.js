#!/usr/bin/env node
//Written by Jiayi

//Query1: How many customers ordered Burger Special on Doordash?

const { MongoClient } = require("mongodb");

const uri = "mongodb://0.0.0.0:27017/";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("GhostKitchen");
    const orders = database.collection("orders");
    const query = {
            $and: [
                {"meal_info.name": "Burger Special"},
                {"pickup.type": "Doordash"},
            ]
        }
    const ordersCount = await orders.countDocuments(query);

    //const ordersCount = await orders.aggregate(query).toArray();
    console.log("*******************************************************");
    console.log(
      "Query1: How many customers ordered Burger Special on Doordash?"
    );
    console.log("*******************************************************");
    console.log(ordersCount);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
