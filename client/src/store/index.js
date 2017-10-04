import {createStore,applyMiddleware} from 'redux';
import reducers from '../reducers/actions'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const middleware = applyMiddleware(logger,thunk);
const store = createStore(reducers,applyMiddleware);

export default store;