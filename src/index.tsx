import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
// import App from './App';
import Router from './router';
ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Router/>
  </React.StrictMode>,
  document.getElementById('root')
);

