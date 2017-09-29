var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');
var Provider = require('react-redux').Provider;
var applyMiddleware = require('redux').applyMiddleware;
var createStore = require('redux').createStore;
var thunkMiddleware = require('redux-thunk').default;
var reducer = require('./reducers/reducer');

let store = createStore(reducer, applyMiddleware(thunkMiddleware))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('app')
)
