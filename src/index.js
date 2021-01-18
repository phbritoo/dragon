import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import dragonListReducer from './store/reducers/dragon-list';
import authReducer from './store/reducers/auth';
import dragonReducer from './store/reducers/dragon';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import 'normalize.css'
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const rootReducer  = combineReducers({
  dragonList: dragonListReducer,
  auth: authReducer,
  dragon: dragonReducer
});
const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
const app = (  
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
