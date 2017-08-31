import { createStore, applyMiddleware, compose } from 'redux';
import rooms from '../reducers';

import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
const loggerMiddleware = createLogger({ collapsed: true });

let store = createStore(
	rooms, 
	compose(
		applyMiddleware(loggerMiddleware),
		composeWithDevTools()
	)
);

export default store;