import React, { Component } from 'react';
import '../App.css';

class Products extends Component {

  state = {
    quantity: 1
  }

  updateQuantity = (event) => {
    const quantity = Math.max(1, Number(event.target.value) || 1);
    this.setState({quantity: quantity});
  };

  addToOrder = () => {
    this.props.addToOrderFunction(this.props.title, this.props.price, this.state.quantity, this.props.size, this.props.colour);
  };

  render(){
    return (
      <div className="container">
        <div className="Products">
          <div className="row">
            <div className='col-3'>
                {this.props.title}
            </div>
            <div className="col-5">
                {this.props.description}
            </div>
            <div className="col-4">
                <ul>price: £{this.props.price.toFixed(2)}</ul>
                <ul>size: {this.props.size}</ul>
                <ul>colour: {this.props.colour}</ul>
                <ul>
                  <label htmlFor={`quantity-${this.props.title}`}>quantity: </label>
                  <input
                    id={`quantity-${this.props.title}`}
                    type="number"
                    min="1"
                    value={this.state.quantity}
                    onChange={this.updateQuantity}
                  />
                </ul>
                <ul><button className="btn btn-secondary"
                    type="button"onClick={this.addToOrder}>add to order</button></ul>
            </div>
            <div>-----------------------------------------------------------------------------------------------------------------------------------------------------------------
                  -----------------------------------------------------------
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;