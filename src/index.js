import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';

import configureStore from './redux/store/configureStore';
import API from './api';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// TODO demo profile
API.init('Profile 1');
// TODO with demo schema
if (!API.loadData().schemas.length) {
  API.saveData({"schemas":[{"id":1,"name":"Demo Schema 1","description":"Demo Schema 1 Description","items":[{"id":1,"name":"Item 1","quantity":"Quantity 1","time":"Time 1"},{"id":2,"name":"Item 2","quantity":"Quantity 2","time":"Time 2"},{"id":3,"name":"Item 3","quantity":"Quantity 3","time":"Time 3"},{"id":4,"name":"Item 4","quantity":"Quantity 4","time":"Time 4"},{"id":5,"name":"Item 5","quantity":"Quantity 5","time":"Time 5"},{"id":6,"name":"Item 6","quantity":"Quantity 6","time":"Time 6"},{"id":7,"name":"Item 7","quantity":"Quantity 7","time":"Time 7"},{"id":8,"name":"Item 8","quantity":"Quantity 8","time":"Time 8"},{"id":10,"name":"Item 10","quantity":"Quantity 10","time":"Time 10"},{"id":11,"name":"Item 11","quantity":"Quantity 11","time":"Time 11"},{"id":12,"name":"Item 12","quantity":"Quantity 12","time":"Time 12"},{"id":13,"name":"Item 13","quantity":"Quantity 13","time":"Time 13"},{"id":14,"name":"Item 14","quantity":"Quantity 14","time":"Time 14"},{"id":15,"name":"Item 15","quantity":"Quantity 15","time":"Time 15"}]}]});
}

const store = configureStore(API.loadData());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={createMuiTheme()}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
