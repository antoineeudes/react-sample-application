import React, { Component } from 'react';
import './styles/App.css';
import { Provider } from 'react-redux';
import Home from './components/Home';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store/configureStore';
import { Redirect } from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props);
    this.page = <Home />
  }

  render() {
    if (store.getState().userInfo.token === '') {
      return <Redirect to='/login' />;
    }
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Home />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;