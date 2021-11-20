const { MongoClient } = require("mongodb");

async function getOrders() {
  let client;
  try {
    const url = "mongodb://localhost:27017";
    //^^connect to protocol
    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    //connect to db and specify db name
    const db = client.db("GhostKitchen");

    //collection -> tables in relational db
    const ordersCollection = db.collection("Orders");

    //MQL - mongo query language -> JSON object
    const query = {};

    //toArray() loads into memory;
    //make sure whatever you're loading fits into memory space
    const orders = await ordersCollection.find(query).toArray();

    console.log("orders:", orders);
  } finally {
    await client.close();
  }
}

module.exports.getOrders = getOrders;

getOrders();
