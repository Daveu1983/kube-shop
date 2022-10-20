from flask import Flask
from flask import jsonify, request
app = Flask(__name__)

@app.route('/api')
def update_rices():
  price = float(request.args.get('price'))
  title = request.args.get('title')
  new_price = get_price(price, title)
  return jsonify(
      price=new_price
  )

def get_price(price, title):
  if title == "t-shirt":
    new_price = price * 1.05
  elif title == "jumper":
    new_price = price * 1.02
  elif title == "jeans":
    new_price = price * 1.075
  elif title == "polo shirt":
    new_price = price * 1.06
  else:
    new_price = price  
  if new_price > 100:
    new_price = 100
  return new_price      
            
    