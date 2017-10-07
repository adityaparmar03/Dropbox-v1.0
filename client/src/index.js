import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Index from './components/index';
import SignUp from './components/signup';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './store/index'

ReactDOM.render(
    <Provider store={store}>
        <Router>
        <div>
         <Route path="/" component={Index} />
         <Route path="/home" component={SignUp} />
         </div>
     </Router>
     </Provider>,
     document.getElementById('root'));
