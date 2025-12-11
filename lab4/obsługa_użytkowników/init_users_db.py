import sqlite3
import bcrypt

connection = sqlite3.connect('users.db')

with open('schema_users.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

password = b"admin123"
hashed = bcrypt.hashpw(password, bcrypt.gensalt())

cur.execute("INSERT INTO users (email, password) VALUES (?, ?)",
            ('admin@example.com', hashed))

connection.commit()
connection.close()