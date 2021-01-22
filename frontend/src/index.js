import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import store from './store/store';


ReactDOM.render(
<Provider store={store}>
  <React.StrictMode>
    <Router>
      <App />
    </Router>
    </React.StrictMode>   
    </Provider>
 ,
  document.getElementById('root')
);

