import React, { Component } from 'react';

import GoogleMap from 'google-map-react';

import './index.css'

const AnyReactComponent = ({ text }) => (
  <div>
    <i style={{color: "#DD4B3E"}} className="fas fa-truck fa-2x"></i>
  </div>
)

const CustomerComponent = ({ text }) => (
  <div>
    <i style={{color: "#4285F4"}} className="fas fa-male fa-3x"></i>
  </div>
)

class CustomerMap extends Component {
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
    this.calculateCenter = this.calculateCenter.bind(this)
  }
  componentDidMount() {
    this.calculateCenter()
  }
  calculateCenter() {
    let centerObj = {}
    centerObj['lat'] = (this.props.customerAddress.lat + this.props.driverAddress.lat) / 2
    centerObj['lng'] = (this.props.customerAddress.lng + this.props.driverAddress.lng) / 2
    
    this.setState({ center:  centerObj })
  }
  
  render() {
    let props = this.props
    
    return (
      <div className="map">
        <GoogleMap
          bootstrapURLKeys={{
            key: "AIzaSyBqb3GaYtbCdOMqq4ZAexpda3D3BD7WzII",
            language: 'ru',
            region: 'ru',
          }}
          defaultZoom={this.state.zoom}
          defaultCenter={this.state.center}  
          // options={this.createMapOptions}>

        >
          <CustomerComponent 
            lat={props.customerAddress.lat}
            lng={props.customerAddress.lng}
          />

          <AnyReactComponent 
            lat={props.driverAddress.lat}
            lng={props.driverAddress.lng}
          />

        </GoogleMap>
      </div>
    );
  }
}

export default CustomerMap;
