var React    = require('react');
var ReactDOM = require('react-dom');
var History  = require('history');
var Router   = require('react-router').Router;
var Route    = require('react-router').Route;


var IndexView  = require('./js/components/index-view');
var ResultView = require('./js/components/result-view');

const history = History.createHistory();

ReactDOM.render((
  <Router history={ history }>
    <Route path="/"       component={ IndexView } />
    <Route path="/search" component={ ResultView } />
  </Router>
), document.getElementById('main'));
