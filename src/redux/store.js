import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducer from './reducer';

const myStore = createStore(Reducer, applyMiddleware(thunk));

export default myStore;
