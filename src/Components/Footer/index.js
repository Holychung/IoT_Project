import React, { Component } from 'react';

import './index.css'

class Footer extends Component {
  constructor(props){
    super(props)
    this.state = {
      driverList: [],
    }
  }
  
  render() {

    return (
      <div className="footer ">
        <p>© Copyright LogisTalk 2019 
          <i className="fab fa-facebook-square fa-2x text-light fb-icon"></i>
          <i className="fab fa-github-square fa-2x text-light mx-2"></i>
          <i className="fas fa-envelope fa-2x text-light"></i>
        </p>
        
      </div>
    );
  }
}

export default Footer;