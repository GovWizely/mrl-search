var React         = require('react');
var ReactDOM      = require('react-dom');
var useBasename   = require('history').useBasename;
var createHistory = require('history').createHistory;
var Router        = require('react-router').Router;
var Route         = require('react-router').Route;


var IndexView  = require('./js/components/index-view');
var ResultView = require('./js/components/result-view');

var history;
if (process.env.NODE_ENV === 'production') {
  history = useBasename(createHistory)({
    basename: 'mrl-search'
  });
} else {
  history = createHistory();
}

const routes = [
  { path: "/", component: IndexView },
  { path: "/search", component: ResultView },
  { path: "*", component: IndexView }
];

ReactDOM.render((
  <Router history={ history } routes={ routes } />
), document.getElementById('main'));
