import React, { Component } from 'react';

// import './index.css'

class Driver extends Component {
  constructor(props){
    super(props)
    this.state = {
      driverInfo: {},
    }
    this.getDriverInfo = this.getDriverInfo.bind(this)
  }
  componentDidMount() {
    let id = this.props.match.params.id
    this.getDriverInfo(tmp_Info)
  }
  getDriverInfo(data) {
    this.setState({
      driverInfo: data
    })
  }

  render() {
    let driverInfo = this.state.driverInfo
    
    console.log(driverInfo)
    return (
      <div className="container">
        {
          Object.keys(driverInfo).length === 0 
          ? <div>Empty</div>
          : <div>
              <h3>{driverInfo.name}</h3>
              {
                driverInfo.orderList.map((order) => 
                  <div key={order.orderID}>
                    訂單編號： {order.orderID}
                  </div>
                )
              }
            </div>
        }
      </div>
    )
  }
}

export default Driver;

const tmp_Info = 
{
  id: 1,
  name: "John",
  orderList: [
    {
      orderID: 123
    },
    {
      orderID: 456
    },
  ]
}
