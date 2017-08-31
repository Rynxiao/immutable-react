'use strict';


import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import { Router, Route, hashHistory } from 'react-router';

import store from '../redux/store';
import Home from './Home';
import List from './List';

//最终渲染
ReactDom.render((
	<Provider store={ store }>
	    <Router history={hashHistory}>
	        <Route path='/' component={Home}></Route>
	        <Route path='/list' component={List} />
	    </Router>
    </Provider>
), document.getElementById('app'));
