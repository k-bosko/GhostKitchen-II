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
