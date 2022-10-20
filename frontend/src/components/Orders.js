import React, { Component } from 'react';
import '../App.css';

class Orders extends Component {


  render(){
    return (
      <div className="container">  
        <div className="Products">
          <div className="row">
            <div className='col-4'>  
                {this.props.title}
            </div>
            <div className="col-4">
                <ul>price: £{this.props.price}</ul>
                <ul>quantity: {this.props.quantity}</ul>
                <ul>size: {this.props.size}</ul>
                <ul>colour: {this.props.colour}</ul>
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

export default Orders;