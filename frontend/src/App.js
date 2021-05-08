import React, { Component } from 'react';
import './App.css';
import Products from './components/Products'
import axios from "axios";

class App extends Component {

  state = {
    products:[]
  }
  componentWillMount() {
    this.getProducts();
  }
  
  getProducts(){
    axios.get('/api')
      .then(response => {
      var recProducts = response.data;
       this.setState({products:recProducts})
       })
       .catch(function (error) {
       console.log(error);
       })
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
