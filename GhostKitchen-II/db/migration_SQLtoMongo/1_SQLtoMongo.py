#!/usr/bin/env python

'''
This script migrates relational database ghost_kitchen.db to JSON format 
such that it can be imported into MongoDB as a next step (i.e. run initializeDB.sh)
Written by: Katerina Bosko
'''
import subprocess
import json
import os 


# 1. Create Orders.json
path = f"{os.getcwd()}/db/migration_SQLtoMongo/"

subprocess.run(["/usr/local/opt/sqlite/bin/sqlite3", f"{path}/ghost_kitchen.db", ".mode json", f".once '{path}/Orders.json'", 
            '''SELECT c.id AS customer_id, m.id AS meal_id,
            m.meal_name, m.description AS meal_description, m.price,
            pt.id AS pickup_id, pt.type AS pickup_type, 
            l.id AS location_id, l.address, l.state, l.phone_number, vb.id AS brand_id, vb.brand_name,
            o.quantity AS order_quantity, o.order_time, o.pickup_time
         FROM Orders AS o
         JOIN Meal AS m
         ON o.meal_id = m.id
         JOIN Pickup_Type AS pt
         ON o.pickup_id = pt.id
         JOIN Customer AS c
         ON c.id=o.customer_id
         JOIN Location AS l
         ON o.location_id = l.id
         JOIN Virtual_Brand AS vb
         ON m.brand_id = vb.id'''])

print(path)

with open(f'{path}/Orders.json', 'r') as f:
    orders = json.load(f)

#need to re-format to group some values into one object
for row in orders:
    row['meal_info'] = {'brand_id': row['brand_id'], 'brand_name': row['brand_name'], 'id': row['meal_id'], 
                        'name': row['meal_name'], 'desc': row['meal_description'], 
                        'price': row['price']}
    del row['brand_id'], 
    del row['brand_name']
    del row['meal_id']
    del row['meal_name']
    del row['meal_description']
    del row['price']

    row['location'] = {'id': row['location_id'], 'address': row['address'], 'state': row['state'], 
                       'phone_number': row['phone_number']}
    
    del row['location_id']
    del row['address']
    del row['state']
    del row['phone_number']

    row['pickup'] = {'id': row['pickup_id'], 'type': row['pickup_type']}
    del row['pickup_id']
    del row['pickup_type']

with open(f'{path}/Orders.json', 'w') as f:
    json.dump(orders, f)


#2. Create Customers.json
subprocess.run(["/usr/local/opt/sqlite/bin/sqlite3", f"{path}/ghost_kitchen.db", ".mode json", f".once {path}/Customers.json", 
            '''SELECT * FROM Customer'''])

#3. Create Meals.json
subprocess.run(["/usr/local/opt/sqlite/bin/sqlite3", f"{path}/ghost_kitchen.db", ".mode json", f".once {path}/Meals.json", 
            '''SELECT vb.brand_name, vb.id AS brand_id, m.id AS meal_id,
            m.meal_name, m.description AS meal_desc, m.calories, m.price
         FROM Meal AS m
         JOIN Virtual_Brand AS vb
         ON m.brand_id = vb.id'''])

#4. Create Ratings.json
subprocess.run(["/usr/local/opt/sqlite/bin/sqlite3", f"{path}/ghost_kitchen.db", ".mode json", f".once {path}/Ratings.json", 
            '''SELECT vb.brand_name, vb.id AS brand_id, m.id AS meal_id,
            m.meal_name, m.description AS meal_desc, r.customer_id, r.rating
         FROM Meal AS m
         JOIN Virtual_Brand AS vb
         ON m.brand_id = vb.id
         JOIN Rating AS r
         ON r.meal_id = m.id'''])

#5. Create Locations.json
locations = [{"id": 1, "address": "3650 Rosecrans Street, San Diego", "state": "CA", "phone_number": "450-345-8924",
              "pickup_types": [{"id": 1, "type": "takeout"}, 
                              {"id": 2, "type": "drive_through"},
                              {"id": 3, "type": "Doordash"},
                              {"id": 4, "type": "UberEats"},
                              {"id": 5, "type": "GrubHub"}]}, 
             {"id": 2, "address": "5198 Commons Drive, Denver", "state": "CO", "phone_number": "370-529-8023",
             "pickup_types": [{"id": 1, "type": "takeout"}, 
                              {"id": 2, "type": "drive_through"},
                              {"id": 3, "type": "Doordash"},
                              {"id": 4, "type": "UberEats"},
                              {"id": 5, "type": "GrubHub"}]},
             {"id": 3, "address": "2521 Palomar Airport Rd, Los Angeles", "state": "CA", "phone_number": "293-327-9275",
             "pickup_types": [{"id": 1, "type": "takeout"}, 
                              {"id": 2, "type": "drive_through"},
                              {"id": 3, "type": "Doordash"},
                              {"id": 4, "type": "UberEats"},
                              {"id": 5, "type": "GrubHub"}]},
             {"id": 4, "address": "575 Market St, Seattle", "state": "WA", "phone_number": "293-327-9275",
              "pickup_types": [{"id": 1, "type": "takeout"}, 
                              {"id": 2, "type": "drive_through"},
                              {"id": 3, "type": "Doordash"},
                              {"id": 4, "type": "UberEats"},
                              {"id": 5, "type": "GrubHub"}]},
             {"id": 5, "address": "3410 Via Mercato, Portland", "state": "OR", "phone_number": "331-672-5915",
              "pickup_types": [{"id": 1, "type": "takeout"}, 
                              {"id": 2, "type": "drive_through"},
                              {"id": 3, "type": "Doordash"},
                              {"id": 4, "type": "UberEats"},
                              {"id": 5, "type": "GrubHub"}]}
            ]
with open(f'{path}/Locations.json', 'w') as f:
    json.dump(locations, f)
#useful documentation - https://stackoverflow.com/questions/5491858/how-to-export-sqlite-to-json