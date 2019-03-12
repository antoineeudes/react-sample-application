import React, { Component } from 'react';
import Login from './components/Login';
import ReactDOM from 'react-dom';
import './styles/App.css';
import { Provider } from 'react-redux';
import Home from './components/Home';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/configureStore';

class App extends Component {
  constructor(props){
    super(props);
    if (store.getState().userInfo.token === '') {
      ReactDOM.render(<Login />, document.getElementById("root"));
    } else {
      console.log(store.getState());
      ReactDOM.render(<Home />, document.getElementById("root"));
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App"></div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;