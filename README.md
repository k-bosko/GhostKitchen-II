# GhostKitchen-II
**Team:** Katerina Bosko, Jiayi Li

This is the continuation of our project ["GhostKitchen"](https://github.com/Jiayi-Emily-Li/GhostKitchen) that was implemented using Express framework for Node.js, SQLite and Bootstrap.

In this project, we migrated SQL database into MongoDB and rewrote the queries using MQL - Mongo's query language. 

## Project description
In this project, we implement a database for a restaurant chain "Golden triangle" which has 5 locations across several U.S. states. The company wants to try out the new business model - ghost kitchen - meaning that the restaurants can create "virtual brands" without providing in-dining options and customers order the new menu items for takeout, drive-through and delivery only. The advantages of this model is that the restaurants can save costs, experiment with new menus and create in-house analytics.

To create a MongoDB database, we went through the whole database creation cycle:

1. Analyzing business requirements
2. Conceptual modeling
3. Logical modeling using hierarchical tables
4. Migrating from SQL format to JSON format
5. Importing JSON files in MongoDB
6. Rewriting the queries using MQL

We also run several MQL queries that could be of potential interest to "Golden Triangle":
- How many customers ordered burgers on Doordash?
- How many orders are takeouts in California?

All the above steps can be found as separate files in our repository.
*Note*: we changed the name of Order table to Orders in physical implementation part because Order is a keyword in SQLite.

Check out our **GhostKitchen app** that was implemented using Express framework for Node.js, SQLite and Bootstrap.

### Conceptual Model
![2_Conceptual_model](https://user-images.githubusercontent.com/37320474/143147989-4d8e2c5d-866e-45e6-92fd-1ab98e81ecd7.png)

### Hierarchical Table
![GhostKitchen_HierarchicalTable](https://user-images.githubusercontent.com/37320474/143148059-47f825be-ce5c-4fb7-aa49-c07aad93825d.png)

### JSON Examples
![GhostKitchen-JSON](https://user-images.githubusercontent.com/37320474/143150697-6330e34f-223f-4599-aec9-f5e391ba95d4.png)

## Using the app

1) Clone the repo and cd into `GhostKitchen-II`
2) Install the dependencies

```
npm install
```


3) Start the server

```
npm start
```

4) Point your browser to http://locahost:3000

# Work Distribution
Jiayi Li worked on creating the Admin page and CRUD Meals and Orders collections.

Katerina Bosko worked on creating th User page and CRUD Customers, Locations, Orders and Ratings collections.

# Acknowledgement
The data for customers collection was generated using [ https://www.mockaroo.com/](https://www.mockaroo.com/)

This is a project for a Database Management Systems class at Northeastern University (Silicon Valley campus) taught by [John Alexis Guerra Gómez]/(https://github.com/john-guerra)
