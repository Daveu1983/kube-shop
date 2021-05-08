from flask import Flask
from flask import jsonify, request
app = Flask(__name__)

@app.route('/api')
def prices():
  price = float(request.args.get('price')) * 1.5
  return jsonify(
      price=price
  )

    