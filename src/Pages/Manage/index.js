import React, { Component } from 'react';
import axios from 'axios';

import SimpleMap from '../../Components/Map'
import './index.css'
const CONST = require('../../constant.js')

class Manage extends Component {
  constructor(props){
    super(props)
    this.state = {
      driverList: [],
    }
    this.getDriver = this.getDriver.bind(this)
  }

  componentDidMount() {
    axios.get(`${CONST.SERVER_URL}/manage`)
    .then(res => this.getDriver(res.data.drivers))
    .catch(err => console.log(err))

    // this.getDriver(tmp_driver)
  }

  getDriver(drivers) {
    this.setState({ driverList: drivers })
  }
  render() {
    return (
      <div className="container mt-3">
        <div className="row mapFrame text-center align-items-center">
          <SimpleMap />
        </div>

        <div className="row mt-3 align-items-center justify-content-center">
          {
            this.state.driverList && this.state.driverList.map(
              (driver) => 
                <div key={driver.driverID} className="card-custom align-self-start col mr-3" style={{width: "18rem"}}>
                  <div className="card-body">
                    <h5 className="card-title">{driver.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Driver Information</h6>            
                  </div>
                </div>
            )
          }
        </div>
      </div>
    )
  }
}


export default Manage;

// const tmp_driver = 
// [
//   {
//     driverID: 1,
//     name: "John",
//     status: 1,
//     lat: 24.783969,
//     lng: 120.996222
//   },
//   {
//     driverId: 2,
//     name: "Uber",
//     status: 1,
//     lat: 24.784553,
//     lng: 120.999526
//   },
// ]

