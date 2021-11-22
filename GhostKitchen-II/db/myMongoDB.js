const { MongoClient } = require("mongodb");

async function getUser(userId) {
  let client;
  try {
    const url = "mongodb://localhost:27017";
    //^^connect to protocol
    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("customers");

    const query = { id: 12 };

    const user = await collection.findOne(query);

    console.log("user:", user);
    return user;
  } finally {
    await client.close();
  }
}

async function getBrands() {
  let client;
  try {
    const url = "mongodb://localhost:27017";
    //^^connect to protocol
    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("meals");

    const query = [
      {
        $group: {
          _id: "$brand_id",
          brands: {
            $first: "$brand_name",
          },
        },
      },
    ];

    const brands = await collection.aggregate(query).toArray();

    // console.log("brands:", brands);
    return brands;
  } finally {
    await client.close();
  }
}

async function getMealsBy(brandID) {
  let client;

  try {
    const url = "mongodb://localhost:27017";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("meals");

    const query = [
      {
        $match: {
          brand_id: parseInt(brandID),
          //^^important!!! brandID is string, need to convert to integer
        },
      },
    ];

    const meals = await collection.aggregate(query).toArray();

    console.log("meals from db", meals);

    return meals;
  } finally {
    await client.close();
  }
}

async function getOrdersBy(userID) {
  let client;

  try {
    const url = "mongodb://localhost:27017";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("orders");

    const query = [
      {
        $match: {
          customer_id: parseInt(userID),
          //^^important!!! userID is string, need to convert to integer
        },
      },
    ];

    const orders = await collection.aggregate(query).toArray();

    console.log("orders from db", orders);

    return orders;
  } finally {
    await client.close();
  }
}

/* Jiayi */

async function getBrandsBy(brandID){
  let client;

  try {
    const url = "mongodb://localhost:27017";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("meals");

    const query = [
      {
        $match: {
          brand_id: parseInt(brandID),
          //^^important!!! brandID is string, need to convert to integer
        },
      },
    ];

    const brands = await collection.aggregate(query).toArray();

    console.log("brands from db", brands);

    return brands;
  } finally {
    await client.close();
  }
}

async function createMeal(newMeal, brand_name, brandID){
  let client;

  try {
    const url = "mongodb://localhost:27017";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("meals");

    const query = 
      {
        brand_name: brand_name,
        brand_id: parseInt(brandID),
        meal_name: newMeal.meal_name,
        meal_desc: newMeal.meal_desc,
        calories: parseInt(newMeal.calories),
        price: parseFloat(newMeal.price),
      }
    const result = await collection.insertOne(query);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);

  } finally {
    await client.close();
  }
}

module.exports = {
  getUser,
  getBrands,
  getMealsBy,
  getOrdersBy,
  getBrandsBy,
  createMeal
};
