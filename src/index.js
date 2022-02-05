import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter} from "react-router-dom"
import store from './Redux/store';
import App from "./App"

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter >
          <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

