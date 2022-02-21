const { MongoClient } = require("mongodb");
let ObjectId = require("mongodb").ObjectId;

/* ------Katerina----- */
// cached propeties
let cachedPickups;
let cachedLocations;

async function getUser(userId) {
  let client;
  try {
    const url = "mongodb://0.0.0.0:27017/";
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
    const url = "mongodb://0.0.0.0:27017/";
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
    const url = "mongodb://0.0.0.0:27017/";

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

    return meals;
  } finally {
    await client.close();
  }
}

async function getOrdersBy(userID) {
  let client;

  try {
    const url = "mongodb://0.0.0.0:27017/";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("orders");

    const query = [
      {
        $match: {
          customer_id: parseInt(userID),
          pickup_time: null,
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
/* ------Katerina----- */

/* Jiayi */

async function getBrandsBy(brandID) {
  let client;

  try {
    const url = "mongodb://0.0.0.0:27017/";

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

async function createMeal(newMeal, brand_name, brandID) {
  let client;

  try {
    const url = "mongodb://0.0.0.0:27017/";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("meals");

    const query = {
      brand_name: brand_name,
      brand_id: parseInt(brandID),
      meal_name: newMeal.meal_name,
      meal_desc: newMeal.meal_desc,
      calories: parseInt(newMeal.calories),
      price: parseFloat(newMeal.price),
    };
    const result = await collection.insertOne(query);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

async function getAllCurrentOrders() {
  let client;

  try {
    const url = "mongodb://0.0.0.0:27017/";

    client = new MongoClient(url);
    //client = new MongoClient(url, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1});

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("orders");

    const query = [
      {
        $match: {
          pickup_time: null,
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

async function updatePickupTime(orderID) {
  let client;

  try {
    const url = "mongodb://0.0.0.0:27017/";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const pickup_time = new Date(Date.now());

    const db = client.db("GhostKitchen");

    const collection = db.collection("orders");

    const query = { _id: ObjectId(orderID) };

    const update = {
      $set: {
        pickup_time: pickup_time.toLocaleString(),
      },
    };

    const orders = await collection.updateOne(query, update);

    console.log("orders from db", orders);

    return orders;
  } finally {
    await client.close();
  }
}

async function deleteMeal(mealID) {
  let client;

  try {
    const url = "mongodb://0.0.0.0:27017/";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("meals");

    const order = await collection.deleteOne({ _id: ObjectId(mealID) });

    return order;
  } finally {
    await client.close();
  }
}

//Jiayi's getMeal
async function getMealByMealID(mealID) {
  let client;

  try {
    const url = "mongodb://0.0.0.0:27017/";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("meals");

    const meal = await collection.findOne({ _id: ObjectId(mealID) });
    return meal;
  } finally {
    await client.close();
  }
}

async function updateMeal(
  mealID,
  brandID,
  meal_name,
  meal_desc,
  calories,
  price
) {
  let client;

  try {
    const url = "mongodb://0.0.0.0:27017/";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("meals");

    const filter = { _id: ObjectId(mealID) };

    const update = {
      $set: {
        brand_id: parseInt(brandID),
        meal_name: meal_name,
        meal_desc: meal_desc,
        calories: parseInt(calories),
        price: parseFloat(price),
      },
    };

    const result = await collection.updateOne(filter, update);
    console.log(
      `${result.matchedCount} document(s) matched the filter, 
      updated ${result.modifiedCount} document(s)`
    );

    return result;
  } catch (error) {
    console.log(`caught - ${error}`);
    throw error;
  } finally {
    await client.close();
  }
}
/* Jiayi */

/* ------Katerina----- */
async function getLocations(renewCache = false) {
  let client;

  if (!renewCache && cachedLocations) {
    console.log("Get cachedLocations");
    return cachedLocations;
  }

  try {
    const url = "mongodb://0.0.0.0:27017/";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("locations");

    const locations = await collection.find({}).toArray();

    cachedLocations = locations;

    return locations;
  } finally {
    await client.close();
  }
}

async function getPickup(renewCache = false) {
  let client;

  if (!renewCache && cachedPickups) {
    console.log("Get chachedPickups");
    return cachedPickups;
  }

  try {
    const url = "mongodb://0.0.0.0:27017/";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("locations");

    const pickups = await collection.findOne(
      { id: 1 },
      { pickup_types: 1, _id: 0 }
    );

    //Note: since we have the same pickup types for every location,
    //we can pick just 1 location, e.g. id: 1
    //in the future should be replaced with javascript
    //in order to choose the pickup type based on restaurant chosen

    cachedPickups = pickups["pickup_types"];

    return cachedPickups;
  } finally {
    await client.close();
  }
}

async function getPickupByID(pickupId) {
  if (!cachedPickups) {
    await getPickup(true);
  }

  let pickup = cachedPickups.find((p) => p.id === pickupId);
  if (!pickup) {
    await getPickup(true);
    pickup = cachedPickups.find((p) => p.id === pickupId);
  }
  return pickup;
}

async function getLocationByID(locationId) {
  if (!cachedLocations) {
    await getLocations(true);
  }

  let location = cachedLocations.find((p) => p.id === locationId);
  if (!location) {
    await getLocations(true);
    location = cachedLocations.find((p) => p.id === locationId);
  }
  return location;
}

async function createOrder(quantity, pickup, location, meal, userID) {
  let client;

  try {
    const url = "mongodb://0.0.0.0:27017/";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("orders");

    const time_ordered = new Date(Date.now());

    const query = {
      customer_id: parseInt(userID),
      order_quantity: parseInt(quantity),
      order_time: time_ordered.toLocaleString(),
      pickup_time: null,
      meal_info: {
        brand_id: meal.brand_id,
        brand_name: meal.brand_name,
        id: meal.meal_id,
        name: meal.meal_name,
        desc: meal.meal_desc,
        price: meal.price,
      },
      location: {
        id: location.id,
        address: location.address,
        state: location.state,
        phone_number: location.phone_number,
      },
      pickup: { id: pickup.id, type: pickup.type },
    };

    const result = await collection.insertOne(query);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

async function getOrderByID(orderID) {
  let client;

  try {
    const url = "mongodb://0.0.0.0:27017/";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("orders");

    const order = await collection.findOne({ _id: ObjectId(orderID) });

    console.log("order from db", order);

    return order;
  } finally {
    await client.close();
  }
}

async function updateOrder(orderID, quantity, pickup) {
  let client;

  try {
    const url = "mongodb://0.0.0.0:27017/";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("orders");

    const filter = { _id: ObjectId(orderID) };

    const update = {
      $set: {
        order_quantity: quantity,
        "pickup.id": pickup.id,
        "pickup.type": pickup.type,
      },
    };

    const result = await collection.updateOne(filter, update);
    console.log(
      `${result.matchedCount} document(s) matched the filter, 
      updated ${result.modifiedCount} document(s)`
    );

    return result;
  } catch (error) {
    console.log(`caught - ${error}`);
    throw error;
  } finally {
    await client.close();
  }
}

async function deleteOrder(orderID) {
  let client;

  try {
    const url = "mongodb://0.0.0.0:27017/";

    client = new MongoClient(url);

    await client.connect();

    console.log("Connected to Mongo Server");

    const db = client.db("GhostKitchen");

    const collection = db.collection("orders");

    const order = await collection.deleteOne({ _id: ObjectId(orderID) });

    return order;
  } finally {
    await client.close();
  }
}
/* ------Katerina----- */

module.exports = {
  getUser,
  getBrands,
  getMealsBy,
  getOrdersBy,
  getBrandsBy,
  createMeal,
  getAllCurrentOrders,
  updatePickupTime,
  deleteMeal,
  getMealByMealID,
  updateMeal,
  getPickup,
  getPickupByID,
  getLocations,
  getLocationByID,
  createOrder,
  getOrderByID,
  updateOrder,
  deleteOrder,
};

//useful documentation
//update: //https://docs.mongodb.com/drivers/node/current/usage-examples/updateOne/
