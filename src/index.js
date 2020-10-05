import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';

import configureStore from './redux/store/configureStore';
import API from './api';

// TODO demo profile
API.init('Profile 1');
// TODO with demo schema
if (!API.loadData().length) {
  API.saveData({"schemas":[{"name":"Demo Schema 1","description":"Demo Schema 1 Description","items":[{"id":1,"name":"Item 111","quantity":"Quantity 1","time":"Time 1"},{"id":6,"name":"111","quantity":"111","time":"111"},{"id":7,"name":"222","quantity":"222","time":"222"}],"id":1}]});
}

const store = configureStore(API.loadData());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
