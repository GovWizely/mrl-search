var React = require('react');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      expanded: true
    };
  },
  handleEnter: function(e) {
    if (e.type === 'keydown' && e.which === 13) {
      this.props.onSubmit(e);
    }
  },
  render: function() {
    var inputClass     = 'form-control';
    var containerClass = 'input-group col-md-12';
    if (this.props.expanded) {
      inputClass     = inputClass.concat(' input-lg');
    }
    return (
      <div className={ containerClass }>
        <input type="text" className={ inputClass } name="keyword" value={ this.props.keyword } onChange={ this.props.onChange } onKeyDown={ this.handleEnter } placeholder="Keyword" />
      </div>
    );
  }
});
