from flask import Flask, jsonify, request
import sqlite3
import bcrypt
import jwt
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'bardzo_tajny_klucz_123'

def get_db_connection():
    conn = sqlite3.connect('users.db')
    conn.row_factory = sqlite3.Row
    return conn


@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password required'}), 400

   
    hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute('INSERT INTO users (email, password) VALUES (?, ?)', (email, hashed))
        conn.commit()
        new_id = cur.lastrowid
        conn.close()
        return jsonify({'id': new_id}), 201
    except sqlite3.IntegrityError:
        conn.close()
        return jsonify({'message': 'User already exists'}), 409

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return 'Could not verify', 401

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()

    if not user:
        return 'User not found', 401

    
    if bcrypt.checkpw(password.encode('utf-8'), user['password']):
        token = jwt.encode({
            'user_id': user['id'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30) 
        }, app.config['SECRET_KEY'], algorithm="HS256")

        return jsonify({'token': token})

    return 'Wrong password', 401

if __name__ == '__main__':
    app.run(debug=True, port=5002)

