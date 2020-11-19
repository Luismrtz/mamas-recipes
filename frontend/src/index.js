import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import {UserProvider} from './context/UserContext';
import App from './App';


ReactDOM.render(
//   <UserProvider>
  <React.StrictMode>
      <App />
    </React.StrictMode>   
//   </UserProvider>
 ,
  document.getElementById('root')
);

