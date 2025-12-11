import sqlite3

connection = sqlite3.connect('orders.db')

with open('schema_orders.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO orders (userId, bookId, quantity) VALUES (?, ?, ?)",
            ('2', '2', '10'))

cur.execute("INSERT INTO orders (userId, bookId, quantity) VALUES (?, ?, ?)",
           ('1', '3', '7'))

connection.commit()
connection.close()