import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import axios from 'axios';

const AnyReactComponent = ({ text }) => (
  <div>
    <i style={{color: "#DD4B3E"}} className="fas fa-truck fa-2x"></i>
  </div>
)

class SimpleMap extends Component {
  constructor(props){
    super(props)
    this.state = {
      driverList: [],
      center: {
        lat: 0,
        lng: 0
      },
      zoom: 16,
    }
    this.getDriver = this.getDriver.bind(this)
    this.calculateCenter = this.calculateCenter.bind(this)
  }
  componentDidMount() {
    // axios.get("/manage")
    // .then(res => console.log(res))
    // .catch(err => console.log(err))

    this.getDriver(tmp_driver)
  }
  getDriver(drivers) {
    this.setState({ driverList: drivers })
    this.calculateCenter(drivers)
  }
  calculateCenter(driverList) {
    let lat_sum = 0
    let lng_sum = 0
    for(let i = 0; i <= driverList.length-1; i++){
        lat_sum += driverList[i].lat
        lng_sum += driverList[i].lng
    }
    
    let centerObj = {}
    centerObj['lat'] = lat_sum / driverList.length
    centerObj['lng'] = lng_sum / driverList.length
    this.setState({
      center:  centerObj
    })
  }

  render() {
    let driverList = this.state.driverList

    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '60vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBqb3GaYtbCdOMqq4ZAexpda3D3BD7WzII"}}
          center={this.state.center}
          defaultZoom={this.state.zoom}
        >
          {
            driverList && driverList.map(
              (driver) => 
                <AnyReactComponent 
                  key={driver.id} 
                  lat={driver.lat}
                  lng={driver.lng}
                />
            )
          }

        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;

const tmp_driver = 
[
  {
    id: 1,
    name: "John",
    lat: 24.783969,
    lng: 120.996222
  },
  {
    id: 2,
    name: "Uber",
    lat: 24.784553,
    lng: 120.999526
  },
]

