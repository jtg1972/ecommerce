import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import store from './redux/createStore';
import {Provider} from 'react-redux';
//import env from 'react-dotenv';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>

      <BrowserRouter>
          <App />
        
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

