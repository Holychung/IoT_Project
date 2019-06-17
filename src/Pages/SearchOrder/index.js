import React, { Component } from 'react';

import axios from 'axios';

import './index.css'

class SearchOrder extends Component {
  constructor(props){
    super(props)
    this.state = {
      orderList: [],
      inputText: ""
    }
    this.getOrders = this.getOrders.bind(this)
    this.setInputText = this.setInputText.bind(this)
  }
  componentDidMount() {
    // axios.get("/orders")
    // .then(res => console.log(res))
    // .catch(err => console.log(err))

    this.getOrders(tmp_Orders)
  }
  getOrders(data) {
    this.setState({
      orderList: data
    })
  }
  setInputText(text) {
    this.setState({
      inputText: text
    })
    console.log(text)
  }
  searchOrder() {
    console.log("ss")
    let searchData = this.state.inputText
    // axios.post('/search', data)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
    this.setState({ inputText: "" })
  }


  render() {
    let orderList = this.state.orderList
    
    // 還差查詢訂單功能 列出訂單商品list資訊
    return (
      <div className="container">

        <div className="row justify-content-center">
          <div className="input-group col-10">
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

        <table className="table mt-3 table-custom">
          <thead className="thead-white mb-5">
            <tr className="table-title">
              <th scope="col-1">#</th>
              <th scope="col-4">Product List</th>
              <th scope="col-2">Total Price</th>
              <th scope="col-2">Add to Cart</th>
              <th scope="col">Address</th>
              <th scope="col-1">Status</th>
            </tr>
          </thead>
          <tbody className="tbody-white">
            {
              orderList && orderList.map((order) => (
                <tr key={order.id}>
                  <th scope="row">{order.id}</th>
                  <td>
                  {
                    order.itemList.map((item) => (
                      <div key={item.id} className="row justify-content-center mb-1">
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
                        <button className='btn-custom btn-depart'>運送中</button>
                      : order.status === 1 ?
                        <button className='btn-custom btn-no'>尚未出貨</button>
                      : order.status === -1 ?
                        <button className='btn-custom btn-done'>已送達</button>
                      : <div>Status Error</div>
                    }
                  </td>
              
                </tr>
              ))
            }            
          </tbody>
          </table>
      </div>
    )
  }
}

export default SearchOrder;

// status 1 運送中, -1 已送達, 0 未出貨 
const tmp_Orders = 
[
  {
    id: "F921D",
    status: 1,
    orderTime: "2019/9/9 23:59",
    address: "30010新竹市東區大學路1001號",
    driver: "John",
    total_price: "120",
    itemList: [
      {
        id: 1,
        name: "蔬菜薯餅吐司",
        price: "50",
        itemCount: 2
      },
      {
        id: 3,
        name: "奶茶",
        price: "20",
        itemCount: 1
      },
    ]
  },
  {
    id: "ED19C",
    status: 0,
    orderTime: "2019/9/9 23:59",
    address: "30010新竹市東區大學路1001號",
    driver: "Kevin",
    total_price: "56,000",
    itemList: [
      {
        id: 1,
        name: "四星手機",
        price: "28,000",
        itemCount: 2
      },
    ]
  },
  {
    id: "7F86C",
    status: -1,
    orderTime: "2019/9/9 23:59",
    address: "30010新竹市東區大學路1001號",
    driver: "Dan",
    total_price: "40,000",
    itemList: [
      {
        id: 3,
        name: "水果手機",
        price: "40,000",
        itemCount: 1
      },
    ]
  }
]

const tmp_search = 
[
  {
    id: "F921D",
    status: 1,
    orderTime: "2019/9/9 23:59",
    address: "30010新竹市東區大學路1001號",
    driver: "John",
    total_price: "120",
    itemList: [
      {
        id: 1,
        name: "蔬菜薯餅吐司",
        price: "50",
        itemCount: 2
      },
      {
        id: 3,
        name: "奶茶",
        price: "20",
        itemCount: 1
      },
    ]
  }
]

