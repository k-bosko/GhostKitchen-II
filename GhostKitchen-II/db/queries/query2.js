#!/usr/bin/env node
//Written by Jiayi 

//Query2: How many orders are takeouts in California?

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

async function run(){
    try{
        await client.connect();
        const database = client.db("GhostKitchen");
        const orders = database.collection("orders");
        const query = {
            $and: [
                {"location.state": "CA"},
                {"pickup.type": "takeout"}
            ]
        }
        const ordersCount = await orders.find(query).count();
        console.log("*******************************************************");
        console.log("Query2: How many orders are takeouts in California?");
        console.log("*******************************************************");
        console.log(ordersCount);
    }finally{
        await client.close();
    }
}
run().catch(console.dir);
