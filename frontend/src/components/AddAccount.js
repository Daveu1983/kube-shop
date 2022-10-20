import React, { Component } from 'react';
import '../App.css';

class AddAccount extends Component {

    render(){
      return (
        <div className="container">  
          <button type="button" onClick={this.addAccountClicked}>
            New User
          </button>
        </div>
      );
    }
  }
  
  export default AddAccount;