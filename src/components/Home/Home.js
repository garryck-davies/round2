import React, {Component} from "react";


import "../Menu/Menu.css";
import './Home.css';
import Messages from "../Messages/Messages";



export default class Home extends Component {
  
  render() {
    return (
      <div className="App">
       
        

        <div className="body">
            <div className="wrapper">
                <div >Header</div>
                <div >Content</div>
            </div>
        </div>
      </div>
    );
  }
}
