#!/bin/bash

mongoimport -h localhost:27017 -d GhostKitchen -c orders --jsonArray ./Orders.json
mongoimport -h localhost:27017 -d GhostKitchen -c customers --jsonArray ./Customers.json
mongoimport -h localhost:27017 -d GhostKitchen -c meals --jsonArray ./meals.json
