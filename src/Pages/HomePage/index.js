import React, { Component } from 'react';

import logo from '../../img/logo1.png';

import './index.css'

class HomePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      driverList: [],
    }
    // this.getDriver = this.getDriver.bind(this)
  }
  componentDidMount() {
    
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          {
          /*<img src={logo} alt="Logo" style={{ height: '15%', width: '15%' }}/>
          */
          }
          
          <div className="textMono">LOGISTALKS</div>
        </div>
      </div>
    )
  }
}


export default HomePage;
