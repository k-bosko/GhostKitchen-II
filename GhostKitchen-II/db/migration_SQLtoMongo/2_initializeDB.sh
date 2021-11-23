#!/bin/bash

mongoimport -h localhost:27017 -d GhostKitchen -c orders --jsonArray --drop ./db/migration_SQLtoMongo/Orders.json
mongoimport -h localhost:27017 -d GhostKitchen -c customers --jsonArray --drop ./db/migration_SQLtoMongo/Customers.json
mongoimport -h localhost:27017 -d GhostKitchen -c meals --jsonArray --drop ./db/migration_SQLtoMongo/Meals.json
mongoimport -h localhost:27017 -d GhostKitchen -c locations --jsonArray --drop ./db/migration_SQLtoMongo/Locations.json
