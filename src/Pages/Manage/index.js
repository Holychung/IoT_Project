import React, { Component } from 'react';
import axios from 'axios';

import SimpleMap from '../../Components/Map'
import './index.css'

class Manage extends Component {
  constructor(props){
    super(props)
    this.state = {
      driverList: [],
    }
    this.getDriver = this.getDriver.bind(this)
  }
  componentDidMount() {
    // setInterval(() => this.getDriver(tmp_driver) , 1000)
    this.getDriver(tmp_driver)
  }
  getDriver(drivers) {
    console.log(drivers)
    this.setState({
      driverList: drivers
    })
  
    // axios.get("https://www.dcard.tw/_api/forums/game/posts?popular=false&limit=30")
    // .then((res) => console.log(res))
    // .catch((err) => console.log(err))
  }
  render() {
    return (
      <div className="container">
        <div className="row mapFrame text-center align-items-center">
          <SimpleMap />
        </div>

        <div className="row mt-3 align-items-center justify-content-center">
          {
            this.state.driverList && this.state.driverList.map(
              (driver) => 
                <div key={driver.id} className="card-custom align-self-start col mr-3 row" style={{width: "18rem"}}>
                  <div className="card-body col">
                    <h5 className="card-title">{driver.name}</h5>
                    <h5 className="card-title">運送狀態：{driver.status}</h5>
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

const tmp_driver = 
[
  {
    id: 1,
    name: "John",
    status: 1,
    lat: 24.783969,
    lng: 120.996222
  },
  {
    id: 2,
    name: "Uber",
    status: 1,
    lat: 24.784553,
    lng: 120.999526
  },
]

