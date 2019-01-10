
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/reducers';

const store = createStore(combineReducers({
  state: reducers,
}), window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk))); // eslint-disable-line

export default store;
