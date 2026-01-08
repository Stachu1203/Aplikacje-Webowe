from flask import Flask, jsonify, request, abort
import sqlite3
import requests
import jwt             
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = 'bardzo_tajny_klucz_123'

BOOKS_SERVICE_URL = "http://127.0.0.1:5000/api/books"

def get_db_connection():
    conn = sqlite3.connect('orders.db')
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


@app.route("/api/orders/<int:userId>", methods=['GET'])
def get_orders(userId):
    conn = get_db_connection()
    orders = conn.execute('SELECT * FROM orders'
                          ' WHERE userId = ?', (userId,)).fetchall()
    conn.close()
    result = []
    for item in orders:
        result.append({k: item[k] for k in item.keys()})
    return jsonify(result)




@app.route("/api/orders", methods=['POST'])
@token_required
def add_order():
    new_order = request.get_json()
    
    userId = new_order.get('userId')
    bookId = new_order.get('bookId')
    quantity = new_order.get('quantity')

    if not userId or not bookId or not quantity:
        return 'Missing data!', 400

   
    try:
        response = requests.get(f"{BOOKS_SERVICE_URL}/{bookId}")
        if response.status_code == 404:
            return jsonify({'message': 'Book not found! Cannot create order.'}), 404
    except requests.exceptions.ConnectionError:
        return jsonify({'message': 'Books service is unavailable. Try again later.'}), 503

   
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        cur.execute('INSERT INTO orders (userId, bookId, quantity) VALUES (?, ?, ?)',
                    (userId, bookId, quantity))
        conn.commit()
        new_id = cur.lastrowid
        conn.close()
        return jsonify({'id': new_id}), 201
    except sqlite3.Error as e:
        conn.close()
        return jsonify({'error': str(e)}), 500


@app.route("/api/orders/<int:orderId>", methods=['DELETE'])
@token_required
def delete_order(orderId):
    conn = get_db_connection()
    
   
    order = conn.execute('SELECT * FROM orders WHERE id = ?', (orderId,)).fetchone()
    if order is None:
        conn.close()
        abort(404)

    
    conn.execute('DELETE FROM orders WHERE id = ?', (orderId,))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Book deleted successfully'}), 200


@app.route("/api/orders/<int:orderId>", methods=['PATCH'])
@token_required
def update_order(orderId):
    data = request.get_json()
    new_quantity = data.get('quantity')

    if not new_quantity:
        return 'Quantity is required', 400

    conn = get_db_connection()
    cur = conn.cursor() 
    cur.execute('UPDATE orders SET quantity = ? WHERE id = ?', (new_quantity, orderId))
    conn.commit()
    
    rows_affected = cur.rowcount 
    conn.close()
    
    if rows_affected == 0:
        return jsonify({'message': 'Order not found'}), 404
    
    return jsonify({'message': 'Order updated'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)