import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SearchOrder from './Pages/SearchOrder'
import Customer from './Pages/Customer'
import Manage from './Pages/Manage'
import Footer from './Components/Footer'

import logo from './img/logo1.png';

const NavBar = () => (
  <div>
    <ul className="nav justify-content-start align-items-center p-3">
      <img src={logo} alt="Logo" className="align-self-start" style={{ height: '10%', width: '10%' }}/>
      <li className="nav-item ml-3">
        <a className="nav-link" href="/">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/manage">Manage</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/searchOrder">Search</a>
      </li>
      
    </ul>
  </div>
)

const NotFound = () => (
  <div>
    Error 404
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route path='/manage' component={ NavBar }/>
        <Route path='/searchOrder' component={ NavBar } />
        <Route exact path='/' component={ NavBar }/>
        <Switch>
          <Route exact path='/' component={ HomePage }/>
          <Route path='/manage' component={ Manage } />
          <Route path='/searchOrder' component={ SearchOrder } />
          <Route path='/customer/:id' component={ Customer } />
          
          <Route component={ NotFound } />
        </Switch>
        <Route path='/' component={ Footer }/>
      </div>
    </BrowserRouter>  
  );
}

export default App;
