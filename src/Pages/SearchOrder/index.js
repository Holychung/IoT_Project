import React, { Component } from 'react';
// import { Link } from 'react-router-dom'

import axios from 'axios';
import './index.css'
const CONST = require('../../constant.js')

class SearchOrder extends Component {
  constructor(props){
    super(props)
    this.state = {
      orderList: [],
      inputText: ""
    }
    this.getOrders = this.getOrders.bind(this)
    this.setInputText = this.setInputText.bind(this)
    this.parseOrders = this.parseOrders.bind(this)
    this.formatTime = this.formatTime.bind(this)
    this.linkToCustomer = this.linkToCustomer.bind(this)
  }

  componentDidMount() {
    axios.get(`${CONST.SERVER_URL}/orders`)
    .then(res => this.parseOrders(res.data.orders))
    .then(data => this.getOrders(data))
    .catch(err => console.log(err))
  }

  parseOrders(data) {
    console.log(data)
    for(let i = 0; i <= data.length-1; i++){
      data[i].orderTime = this.formatTime(data[i].orderTime)
      data[i].customerUrl = "http://140.113.123.90:9527/customer/" + data[i].id
    }
    return data
  }

  formatTime(timeString) {
    // "2019-06-16T14:41:31.000Z"
    let day = timeString.split('T')[0]
    let date = timeString.split('T')[1].split('.')[0]

    return (day + ' ' + date)
  }

  getOrders(data) {
    if(data.length > 0){
      this.setState({ orderList: data })
    } else {
      this.setState({ orderList: [] })
    }
  }

  setInputText(text) {
    this.setState({ inputText: text })
  }

  searchOrder() {
    let uid = this.state.inputText

    axios.get(`${CONST.SERVER_URL}/search/?uid=${uid}`)
    .then(res => this.getOrders(res.data.orders))
    .catch(err => console.log(err))

    this.setState({ inputText: "" })
  }

  linkToCustomer(link) {
    const w = window.open('about:blank');
    w.location.href = link
  }

  render() {
    let orderList = this.state.orderList
    console.log(orderList)
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="input-group col-6">
            <input 
              type="text" 
              className="form-control" 
              placeholder="請輸入訂單編號" 
              onChange={(e) => this.setInputText(e.target.value)}
              aria-label="Username" 
              aria-describedby="addon-wrapping"
              value={this.state.inputText}
            />
            <div className="input-group-append">
              <button className="btn btn-secondary" type="button" 
                onClick={() => this.searchOrder()}>
                Search
              </button>
            </div>
          </div>
        </div>

        <table className="table mt-3 table-custom mb-5 pb-5">
          <thead className="thead-white mb-5">
            <tr className="table-title">
              <th scope="col">#</th>
              <th scope="col">Product List</th>
              <th scope="col">Total Price</th>
              <th scope="col">Add to Cart</th>
              <th scope="col">Address</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody className="tbody-white">
            {
              orderList && orderList.map((order, index) => (
                <tr key={order.id}>
                  <th scope="row">{index+1}</th>
                  <td>
                  {
                    order.itemList.map((item) => (
                      <div key={item.id} className="row justify-content-center mb-1  ml-1">
                        <div className="col px-0">
                          {item.name} 
                          <div className="numItem text-muted">NT${item.price}</div>
                        </div>
                        <div className="text-right align-self-end col-3">
                          <span className="numItem">{item.itemCount}</span>
                        </div>
                      </div>
                    ))
                  }
                  </td>
                  <td>NT${order.total_price}</td>
                  <td>{order.orderTime}</td>
                  <td>{order.address}</td>
                  <td>
                    {
                      order.status === 0 ? 
                        <button className='btn btn-no' onClick={()=>this.linkToCustomer(order.customerUrl)}>尚未出貨</button>
                      : order.status === 1 ?
                        <button className='btn btn-depart' onClick={()=>this.linkToCustomer(order.customerUrl)}>出貨中</button>
                      : order.status === -1 ?
                        <button className='btn btn-done' onClick={()=>this.linkToCustomer(order.customerUrl)}>已送達</button>
                      : <div>Status Error</div>
                    }
                  </td>
              
                </tr>
              ))
            }            
          </tbody>
          </table>
          <div className="spacing"></div>
      </div>
    )
  }
}

export default SearchOrder;

// status 1 運送中, -1 已送達, 0 未出貨 
// const tmp_Orders = 
// [
//   {
//     id: "F921D",
//     status: 1,
//     orderTime: "2019/9/9 23:59",
//     address: "30010新竹市東區大學路1001號",
//     driver: "John",
//     total_price: "120",
//     itemList: [
//       {
//         id: 1,
//         name: "蔬菜薯餅吐司",
//         price: "50",
//         itemCount: 2
//       },
//       {
//         id: 3,
//         name: "奶茶",
//         price: "20",
//         itemCount: 1
//       },
//     ]
//   },
//   {
//     id: "ED19C",
//     status: 0,
//     orderTime: "2019/9/9 23:59",
//     address: "30010新竹市東區大學路1001號",
//     driver: "Kevin",
//     total_price: "56,000",
//     itemList: [
//       {
//         id: 1,
//         name: "四星手機",
//         price: "28,000",
//         itemCount: 2
//       },
//     ]
//   },
//   {
//     id: "7F86C",
//     status: -1,
//     orderTime: "2019/9/9 23:59",
//     address: "30010新竹市東區大學路1001號",
//     driver: "Dan",
//     total_price: "40,000",
//     itemList: [
//       {
//         id: 3,
//         name: "水果手機",
//         price: "40,000",
//         itemCount: 1
//       },
//     ]
//   }
// ]

// const tmp_search = 
// [
//   {
//     id: "F921D",
//     status: 1,
//     orderTime: "2019/9/9 23:59",
//     address: "30010新竹市東區大學路1001號",
//     driver: "John",
//     total_price: "120",
//     itemList: [
//       {
//         id: 1,
//         name: "蔬菜薯餅吐司",
//         price: "50",
//         itemCount: 2
//       },
//       {
//         id: 3,
//         name: "奶茶",
//         price: "20",
//         itemCount: 1
//       },
//     ]
//   }
// ]

