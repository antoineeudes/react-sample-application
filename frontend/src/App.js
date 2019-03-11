import React, { Component } from 'react';
import Login from './Login'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginPage:[],
      uploadScreen:[]
    }
  }
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;