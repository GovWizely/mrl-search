var Backbone      = require('backbone');
var BackboneReact = require('backbone-react-component');
var _             = require('lodash');
var React         = require('react');

module.exports = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  keywordString: null,
  getDefaultProps: function() {
    return {
      count: null,
      keyword: null
    };
  },
  message: function() {
    if (this.props.count === null) return null;

    var msg = this.props.count ? 'results' : 'result';
    msg = msg.concat(' were found');

    if (this.keywordString && !(this.keywordString === '')) {
      msg = msg.concat(' for the search for');
    }
    return msg;
  },
  count: function() {
    return <strong className="text-danger">{ this.props.count }</strong>;
  },
  keyword: function() {
    if (!this.keywordString) return null;
    return <strong className="text-danger">{ this.keywordString }</strong>;
  },
  render: function() {
    this.keywordString = _.clone(this.props.keyword);
    return (
      <h6>
        { this.count() } { this.message() } { this.keyword() }.
      </h6>
    );
  }
});
