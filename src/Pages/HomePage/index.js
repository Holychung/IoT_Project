import React, { Component } from 'react';

// import logo from '../../img/logo1.png';
import img_phone from '../../img/cellphone.svg'
import './index.css'

class HomePage extends Component {
  constructor(props){
    super(props)
    this.state = {
      driverList: [],
    }
    // this.getDriver = this.getDriver.bind(this)
  }
  componentDidMount() {
    
  }
  
  render() {
    return (
      <div className="container">
        <div className="row m-5 px-5">
          {
          /*<img src={logo} alt="Logo" style={{ height: '15%', width: '15%' }}/>
          */
          }
          {/*<div className="textMono">LOGISTALKS</div>*/}
          <div className="col"></div>  
          <div className="col title-text">We are LOGISTALKS !</div>  
          <div className="col"></div>  
        </div>

        <div className="row m-5 px-5">
          <div className="col" />
          <img src={img_phone} 
            className="col phone-style"
            alt="phone" 
            // style={{ height: '50%', width: '50%' }}
          />
          <div className="col" />
        </div>

        <div className="row m-5 px-5">
          <div className="col justify-content-center text-center">
            <h4>操作簡易</h4>
            <h6 className="sub-title text-muted">消費者可以在官方line帳號上就能購買商品和追蹤貨物資訊</h6>
          </div>
          <div className="col justify-content-center text-center">
            <h4>掌握貨品即時位置</h4>
            <h6 className="sub-title text-muted">司機即時傳送GPS資料，管理者與消費者能及時掌握貨品即時位置</h6>
          </div>
          <div className="col justify-content-center text-center">
            <h4>司機自由選擇商品</h4>
            <h6 className="sub-title text-muted">司機從公司配發的手機中使用送貨APP選擇想要配送的貨品</h6>
          </div>
        </div>
      </div>
    )
  }
}


export default HomePage;
