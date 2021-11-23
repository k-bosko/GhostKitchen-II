#!/usr/bin/env node
//Written by Jiayi 

//Query1: How many customers ordered Burger Special on Doordash?

const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

async function run(){
    try{
        await client.connect();
        const database = client.db("GhostKitchen");
        const orders = database.collection("orders");
        const query = [
            {
              '$match': {
                'meal_info.name': 'Burger Special'
              }
            }, {
              '$match': {
                'pickup.type': 'Doordash'
              }
            }, {
              '$count': 'count'
            }
          ];
        const ordersCount = await orders.aggregate(query).toArray();
        console.log("Query1: How many customers ordered Burger Special on Doordash?");
        console.log(ordersCount[0].count);
    }finally{
        await client.close();
    }
}
run().catch(console.dir);
