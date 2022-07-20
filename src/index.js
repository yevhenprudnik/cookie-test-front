import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import App from './containers/App';
import { createLogger } from 'redux-logger';
import 'tachyons'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom';
import PostsSlice from './redux/PostsSlice';
import UserSlice from './redux/UserSlice';

const rootReducer = combineReducers({PostsSlice, UserSlice})
const logger = createLogger();
const store = configureStore({
  reducer: rootReducer, 
  middleware: [ thunk, logger ]
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/cookie-test-front">
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

