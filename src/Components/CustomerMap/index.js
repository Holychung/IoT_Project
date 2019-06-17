import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import GoogleMap from 'google-map-react';

import './index.css'

const AnyReactComponent = ({ text }) => (
  <div>
    <i style={{color: "#DD4B3E"}} className="fas fa-truck fa-2x"></i>
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
      zoom: 8.5,
    }
    this.calculateCenter = this.calculateCenter.bind(this)
  }
  componentDidMount() {
    this.calculateCenter()
  }
  calculateCenter() {
    console.log(this.props)
    let centerObj = {}
    centerObj['lat'] = (this.props.customerAddress.lat + this.props.driverAddress.lat) / 2
    centerObj['lng'] = (this.props.customerAddress.lng + this.props.driverAddress.lng) / 2
    
    this.setState({
      center:  centerObj
    })
  }
  
  render() {
    let props = this.props
    console.log(props)
    return (
      
      <div className="map" style={{ height: '60vh', width: '100%' }}>
        {/*
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBqb3GaYtbCdOMqq4ZAexpda3D3BD7WzII"}}
          center={this.state.center}
          defaultZoom={this.state.zoom}
          
        >
          <AnyReactComponent 
            text="a"
            lat={props.customerAddress.lat}
            lng={props.customerAddress.lng}
          />
          <AnyReactComponent 
            lat={props.driverAddress.lat}
            lng={props.driverAddress.lng}
          />
        </GoogleMapReact>
        
        */}

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
          <AnyReactComponent 
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
