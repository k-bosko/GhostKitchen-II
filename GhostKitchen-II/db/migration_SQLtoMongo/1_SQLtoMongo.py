#!/usr/bin/env python

'''
This script migrates relational database ghost_kitchen.db to JSON format 
such that it can be imported into MongoDB as a next step (i.e. run initializeDB.sh)
Written by: Katerina Bosko
'''
import subprocess
import json

# 1. Create Orders.json
subprocess.run(["/usr/local/opt/sqlite/bin/sqlite3", "ghost_kitchen.db", ".mode json", f".once Orders.json", 
            '''SELECT c.id AS customer_id, m.id AS meal_id,
            m.meal_name, m.description AS meal_description,
            pt.type AS pickup_type, o.quantity AS order_quantity, l.address, l.state, l.phone_number, vb.brand_name,
            o.order_time, o.pickup_time
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

with open('Orders.json', 'r') as f:
    orders = json.load(f)

#need to re-format to group some values into one object
for row in orders:
    row['meal_info'] = {'brand_name': row['brand_name'], 'id': row['meal_id'], 
                        'name': row['meal_name'], 'desc': row['meal_description']}
    del row['brand_name']
    del row['meal_id']
    del row['meal_name']
    del row['meal_description']
    row['location'] = {'address': row['address'], 'state': row['state'], 
                       'phone_number': row['phone_number']}
    del row['address']
    del row['state']
    del row['phone_number']

with open('Orders.json', 'w') as f:
    json.dump(orders, f)


#2. Create Customers.json
subprocess.run(["/usr/local/opt/sqlite/bin/sqlite3", "ghost_kitchen.db", ".mode json", f".once Customers.json", 
            '''SELECT * FROM Customer'''])


#3. Create Meals.json
subprocess.run(["/usr/local/opt/sqlite/bin/sqlite3", "ghost_kitchen.db", ".mode json", f".once Meals.json", 
            '''SELECT vb.brand_name, m.id AS meal_id,
            m.meal_name, m.description AS meal_desc, r.customer_id, r.rating
         FROM Meal AS m
         JOIN Virtual_Brand AS vb
         ON m.brand_id = vb.id
         JOIN Rating AS r
         ON r.meal_id = m.id'''])
         
#useful documentation - https://stackoverflow.com/questions/5491858/how-to-export-sqlite-to-json