import React, { Component } from 'react';
import '../App.css';

class Products extends Component {

  addToOrder = () => {
    this.props.addToOrderFunction(this.props.title, this.props.price, this.props.quantity, this.props.size, this.props.colour);
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
                <ul>price: £{this.props.price}</ul>
                <ul>quantity: {this.props.quantity}</ul>
                <ul>size: {this.props.size}</ul>
                <ul>colour: {this.props.colour}</ul>
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