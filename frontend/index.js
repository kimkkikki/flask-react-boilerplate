import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './containers/Home'

ReactDOM.render(
    <BrowserRouter>
        <Route exact path="/" component={ Home } />
    </BrowserRouter>
    , document.getElementById('root'));


if (module.hot) {
    module.hot.accept()
}