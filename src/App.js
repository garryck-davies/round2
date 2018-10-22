import React, { Component } from 'react';
import routes from "./routes";

import './reset.css';
import './App.css';

import Sidebar from "./components/Menu/Menu";




export default class App extends Component {

  render() {
     return(
    <div className="App">
       <Sidebar />
      {routes}
     
     </div>
     )
    }
  }