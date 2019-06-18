import React, { Component } from 'react';
import axios from 'axios';

import CustomerMap from '../../Components/CustomerMap'
import './index.css'

import logo from '../../img/logo1.png';

const CONST = require('../../constant.js')
const google = window.google

class Customer extends Component {
  constructor(props){
    super(props)
    this.state = {
      routeInfo: [],
      estimateTime: "",
      estimateDistance: "",
      isHouse: false,
      isBoard: false,
      isDone: false 
    }
    this.getRoute = this.getRoute.bind(this)
    this.getDistanceMatrix = this.getDistanceMatrix.bind(this)
    this.formatResponseTime = this.formatResponseTime.bind(this)
    this.formatResponseDistance = this.formatResponseDistance.bind(this)
    this.callback = this.callback.bind(this)
  }
  componentDidMount() {
    let uid = this.props.match.params.id
    
    setInterval(() => 
      axios.get(`${CONST.CUSTOMER_URL}/order/?uid=${uid}`)
      .then(res => this.getRoute(res))
      .catch(err => console.log(err))
    , 3000)
    
    // this.getRoute(tmp_route)
  }
  getRoute(response) {
    if(Object.keys(response).length === 0){
      console.log('Nothing')
    } else {

      let cAddress = response.data.order[0].customerAddress
      let dAddress = response.data.driverAddress
      let order_status = response.data.order[0].status
      let routeInfo = response.data.order // Array type 
      routeInfo[0]['driverAddress'] = dAddress
      console.log(dAddress)
      // console.log(routeInfo[0])

      this.setState({ routeInfo: routeInfo })

      if(order_status === 0){
        this.setState({ isHouse: true })
      } else if(order_status === 1){
        this.setState({ isBoard: true })
        this.getDistanceMatrix(cAddress, dAddress)
      } else if(order_status === -1){
        this.setState({ isDone: true })
      }
    }
    
  }
  getDistanceMatrix(customerAddress, driverAddress) {
    let origin = new google.maps.LatLng(customerAddress);
    let destination = new google.maps.LatLng(driverAddress);
    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: 'DRIVING',
        avoidHighways: false,
        avoidTolls: false,
      }, this.callback);
  }
  callback(response, status) {
    if(status === "OK"){
      this.setState({
        estimateTime: this.formatResponseTime(response),
        estimateDistance: this.formatResponseDistance(response)
      })
      
    }
  }
  formatResponseTime(response) {
    return response['rows'][0]['elements']['0']['duration']['text']
  }
  formatResponseDistance(response) {
    return response['rows'][0]['elements']['0']['distance']['text']
  }

  render() {

    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="col">
            <div className="mapFrame text-center align-items-center">
              {
                this.state.isBoard === true ?
                  <CustomerMap  
                    customerAddress={this.state.routeInfo[0].customerAddress}
                    driverAddress={this.state.routeInfo[0].driverAddress}
                  />
                : this.state.isHouse === true ? 
                  <h2 className="textCenter text-muted my-auto">尚未出貨！</h2>
                : this.state.isDone === true ?
                  <h2 className="textCenter text-muted my-auto">已完成訂單！</h2>
                : <h2 className="textCenter text-muted my-auto">等待中...</h2>

              }
            
            </div>

            <div className="col mt-3 px-0">
              {
                this.state.routeInfo.length === 1 ? 
                  <div className="card col-12 mb-3" >
                    <div className="card-body w-100">
                      <h5 className="card-title">您的訂單：{this.state.routeInfo[0].id}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">預估剩餘時間：{this.state.estimateTime}</h6>
                      <h6 className="card-subtitle mb-2 text-muted">預估距離：{this.state.estimateDistance}</h6>
                      {
                        this.state.routeInfo[0].itemList.map((item) => (
                          <div key={item.id} className="row justify-content-center">
                            <div className="col">
                              {item.name} 
                            </div>
                            <div className="text-right col">
                              <span className="numItem">{item.itemCount} * NT${item.price}</span>
                            </div>
                          </div>
                        ))
                      }
                      
                      <h5 className="card-title text-right">總計: NT${this.state.routeInfo[0].total_price}</h5>
                    </div>
                  </div>
                  :
                  <div></div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Customer;

const NavBar = () => (
  <div>
    <ul className="nav justify-content-start align-items-center p-3 row">
      <div className="col" />
      <img src={logo} alt="Logo" className="align-self-center col custom-logo" />
      <div className="col" />
    </ul>
  </div>
)

// const tmp_route = 
// [
//   {
//     id: 1,
//     customerAddress: {
//       "lat": 24.7838,
//       "lng": 120.9962
//     },
//     driverAddress: {
//       "lat": 24.178800,
//       "lng": 120.646493
//     },
//     name: "John",
    
//     order: 
//     {
//       id: "F921D",
//       status: 1,
//       driver: "John",
//       total_price: "120",
//       itemList: [
//         {
//           id: 1,
//           name: "蔬菜薯餅吐司 Hash Brown Toast",
//           price: "50",
//           itemCount: 2
//         },
//         {
//           id: 3,
//           name: "奶茶 Milk Tea",
//           price: "20",
//           itemCount: 1
//         },
//       ]
//     },
//   }
// ]