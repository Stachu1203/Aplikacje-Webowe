from flask import Flask, jsonify, request, abort
import sqlite3
import jwt             
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = 'bardzo_tajny_klucz_123'

def get_db_connection():
    conn = sqlite3.connect('books.db')
    conn.row_factory = sqlite3.Row
    return conn

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
       
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(" ")[1] 
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
        
        return f(*args, **kwargs)
    return decorated

@app.route("/api/books", methods=['GET'])
def get_books():
    conn = get_db_connection()
    books = conn.execute('SELECT * FROM books').fetchall()
    conn.close()
    result = []
    for item in books:
        result.append({k: item[k] for k in item.keys()})
    return jsonify(result)


@app.route("/api/books/<int:id>", methods=['GET'])
@token_required
def get_book(id):
    conn = get_db_connection()
    book = conn.execute('SELECT * FROM books WHERE id = ?', (id,)).fetchone()
    conn.close()

    if book is None:
        abort(404)
    
    result = {k: book[k] for k in book.keys()}
    return jsonify(result)


@app.route("/api/books", methods=['POST'])
@token_required
def add_book():
    new_book = request.get_json()
    
    title = new_book.get('title')
    author = new_book.get('author')
    year = new_book.get('year')

    if not title or not author or not year:
        return 'More information required!', 400

    conn = get_db_connection()
    cur = conn.cursor()
    
    cur.execute('INSERT INTO books (title, author, year) VALUES (?, ?, ?)', 
                (title, author, year))
    
    conn.commit()
    new_id = cur.lastrowid
    conn.close()

    return jsonify({'id': new_id}), 201


@app.route("/api/books/<int:id>", methods=['DELETE'])
@token_required
def delete_book(id):
    conn = get_db_connection()
    
   
    book = conn.execute('SELECT * FROM books WHERE id = ?', (id,)).fetchone()
    if book is None:
        conn.close()
        abort(404)

    
    conn.execute('DELETE FROM books WHERE id = ?', (id,))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Book deleted successfully'}), 200

@app.route("/api/books/<int:id>", methods=['PUT'])
@token_required
def update_book(id):
    conn = get_db_connection()
    
   
    book = conn.execute('SELECT * FROM books WHERE id = ?', (id,)).fetchone()
    
    if book is None:
        conn.close()
        abort(404)

   
    updated_data = request.get_json()
    new_title = updated_data.get('title')
    new_author = updated_data.get('author')
    new_year = updated_data.get('year')

    
    conn.execute('UPDATE books SET title = ?, author = ?, year = ?'
                 'WHERE id = ?', 
                 (new_title, new_author, new_year, id))
    
    conn.commit()
    conn.close()

    
    return jsonify({'message': 'Book updated successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)