import React, { Component } from 'react';

import CustomerMap from '../../Components/CustomerMap'
import './index.css'

import logo from '../../img/logo1.png';

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
    // axios
    // axios.get(`/customer/${uid}`)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))

    this.getRoute(tmp_route)
  }
  getRoute(route) {
    this.setState({
      routeInfo: route
    })

    if(route[0].order.status === 0){
      this.setState({ isHouse: true })
    } else if(route[0].order.status === 1){
      this.setState({ isBoard: true })
      // Cautious! Now is Array type
      this.getDistanceMatrix(route[0].customerAddress, route[0].driverAddress)
    } else if(route[0].order.status === -1){
      this.setState({ isDone: true })
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
        <div className="container mt-3">
          <div className="row">
            <div className="col-6 mapFrame text-center align-items-center">
              {
                this.state.isBoard === true ?
                  <CustomerMap  
                    customerAddress={this.state.routeInfo[0].customerAddress}
                    driverAddress={this.state.routeInfo[0].driverAddress}
                />
                : this.state.isHouse === true ? 
                  <h2 className="textCenter text-muted my-auto">尚未出貨！</h2>
                : <h2 className="textCenter text-muted my-auto">已完成訂單！</h2>
              }
            
            </div>

            <div className="col-5 ml-4">
              {
                this.state.routeInfo.length !== 0 ? 
                  <div className="card col-9 mb-3 row" style={{width: "24rem"}}>
                    <div className="card-body container">
                      <h5 className="card-title">您的訂單：{this.state.routeInfo[0].order.id}</h5>
                      <h5 className="card-title">運送狀態： {this.state.routeInfo[0].order.status} </h5> 
                      <h6 className="card-subtitle mb-2 text-muted">預估剩餘時間：{this.state.estimateTime}</h6>
                      <h6 className="card-subtitle mb-2 text-muted">預估距離：{this.state.estimateDistance}</h6>
                      {
                        this.state.routeInfo[0].order.itemList.map((item) => (
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
                      
                      <h5 className="card-title text-right">總計: NT${this.state.routeInfo[0].order.total_price}</h5>
                      <a href="#" className="card-link">More Information</a>
                    </div>
                  </div>
                  :
                  <div>Yeeee Nothing</div>
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
    <ul className="nav justify-content-start align-items-center p-3">
      <img src={logo} alt="Logo" className="align-self-start" style={{ height: '10%', width: '10%' }}/>
    </ul>
  </div>
)

const tmp_route = 
[
  {
    id: 1,
    customerAddress: {
      "lat": 24.7838,
      "lng": 120.9962
    },
    driverAddress: {
      "lat": 24.178800,
      "lng": 120.646493
    },
    name: "John",
    
    order: 
    {
      id: "F921D",
      status: 1,
      driver: "John",
      total_price: "120",
      itemList: [
        {
          id: 1,
          name: "蔬菜薯餅吐司 Hash Brown Toast",
          price: "50",
          itemCount: 2
        },
        {
          id: 3,
          name: "奶茶 Milk Tea",
          price: "20",
          itemCount: 1
        },
      ]
    },
  }
]