var $        = require('jquery');
var Backbone = require('backbone');
var React    = require('react');
var ReactDOM = require('react-dom');


var Router = require('./router');
var View = require('./components/view');

var router = new Router();

ReactDOM.render(<View router={ router } />, $('#main').get(0));

Backbone.history.start();
