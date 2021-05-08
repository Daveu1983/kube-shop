import React, { Component } from 'react';
import './App.css';
import Products from './components/Products'

class App extends Component {

  state = {
    products:[
      {title: "t-shirt", description: "funky and loud", price: 5, quantity: 0, size: "L", colour: "black"},
      {title: "jumper", description: "plain pattern", price: 10, quantity: 0, size: "XL", colour: "white"},
      {title: "jeans", description: "straight denim", price: 15, quantity: 0, size: "34W30L", colour: "blue"},
      {title: "polo shirt", description: "plain", price: 5, quantity: 0, size: "S", colour: "black"}
    ]
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
        colour={element.colour}/>
        })
      }
      </div>
    );
  }
}



export default App;
