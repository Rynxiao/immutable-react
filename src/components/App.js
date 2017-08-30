'use strict';


import React from 'react';
import ReactDom from 'react-dom';

import { Router, Route, hashHistory } from 'react-router';
import Home from './Home';
import List from './List';
import Detail from './Detail';

//最终渲染
ReactDom.render((
    <Router history={hashHistory}>
        <Route path='/' component={Home}></Route>
        <Route path='/list' component={List} />
        <Route path='/detail' component={Detail} />
    </Router>
), document.getElementById('app'));
