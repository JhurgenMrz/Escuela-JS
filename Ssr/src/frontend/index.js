import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import reducer from './reducers';
import { createBrowserHistory } from 'history'

import App from './routes/App';

if (typeof window !== 'undefined') {
  let composeEnhancers;
  if (process.env.NODE_ENV === 'production') composeEnhancers = compose;
  else composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const preloadedState = window.__PRELOADED_STATE__;
  const store = createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(ReduxThunk)));

  const history = createBrowserHistory();

  hydrate(
    <Provider store={store}>
      <Router history={history}>
        <App isLogged={(preloadedState.use.id)}/>
      </Router>
    </Provider>,
    document.getElementById('app'),
  );
}

