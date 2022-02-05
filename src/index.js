import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter} from "react-router-dom"
import store from './Redux/store';
import App from "./App"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename='social-web-frontend'>
          <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

