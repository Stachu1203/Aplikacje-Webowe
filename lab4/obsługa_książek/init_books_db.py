import sqlite3

connection = sqlite3.connect('books.db')

with open('schema_books.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
            ('Wiedźmin: Ostatnie Życzenie', 'Andrzej Sapkowski', 1993))

cur.execute("INSERT INTO books (title, author, year) VALUES (?, ?, ?)",
           ('Hobbit', 'J.R.R. Tolkien', 1937))

connection.commit()
connection.close()