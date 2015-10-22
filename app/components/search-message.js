var Backbone      = require('backbone');
var BackboneReact = require('backbone-react-component');
var _             = require('lodash');
var React         = require('react');

module.exports = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  message: function() {
    interpolation = {
      count: this.props.count,
      results: this.props.count ? 'results' : 'result',
      keyword: ''
    };
    var template = '';
    if (this.props.keyword === '') {
      template = "<%= count %> <%= results %> were found.";
    } else {
      template = "<%= count %> <%= results %> were found for the search for <%= keyword %>.";
    }
    return _.template(template)(interpolation);
  },
  render: function() {
    return (
      <h6>
        { this.props.count }
      </h6>
    );
  }
});
