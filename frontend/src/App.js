import React, { Component } from 'react';
import './App.css';
import Products from './components/Products'
import Orders from './components/Orders';
import axios from "axios";

class App extends Component {

  state = {
    products:[],
    orders:[],
    truee: true
  }
  componentWillMount() {
    this.getProducts();
  }
  
  getProducts(){
    axios.get('/api')
      .then(response => {
      let recProducts = response.data;
       this.setState({products:recProducts})
       })
       .catch(function (error) {
       console.log(error);
       })
  }

  addToOrder= (title, price, quantity, size, colour)=>{
    const newOrder = this.state.orders.map((order)=>{
      return order
    })
    //const newOrder = []
    newOrder.push({title: title, price: price, quantity: quantity, size: size, colour: colour})
    this.setState({orders:newOrder})
  }

  render(){ 
    return (
      <div>
      {
        this.state.products.map((element, index)=>{
          return  <Products 
          key={index}
          title={element.title}
          description={element.description}
          price={element.price}
          quantity={element.quantity}
          size={element.size}
          colour={element.colour}
          addToOrderFunction={this.addToOrder}/>
          })
      } 
      <div>
        <h2>ORDERS</h2>
        <p>-----------------------------------------------------------------------------------------------------------------------------------------------------------------
                  -----------------------------------------------------------</p>
      </div>


      { 
        this.state.orders.map((element, index)=>{
          return  <Orders
          key={index}
          title={element.title}
          price={element.price}
          quantity={element.quantity}
          size={element.size}
          colour={element.colour}/>
          })
      }
      </div>
    );
  }
}



export default App;
