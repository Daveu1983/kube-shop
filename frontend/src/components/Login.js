import React, { Component } from 'react';
import '../App.css';

class Login extends Component {

    render(){
      return (
        <div className="container">  
          <button type="button" onClick={this.loginClicked}>
            Login
          </button>
        </div>
      );
    }
  }
  
  export default Login;