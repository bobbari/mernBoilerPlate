import { createStore, applyMiddleware } from "redux";
import rootReducer from './rootreducers'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'

const middleWare = [thunk];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleWare)));

export default store