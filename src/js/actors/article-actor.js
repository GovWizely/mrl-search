var Dispatcher   = require('../dispatcher/dispatcher');
var ActionTypes  = require('../constants/constants').ActionTypes;

module.exports = {
  search: function(query) {
    console.log('search');
    Dispatcher.dispatch({
      type:  ActionTypes.SEARCH,
      query: query
    });
  },

  filter: function(filters) {
    Dispatcher.dispatch({
      type:    ActionTypes.FILTER,
      filters: filters
    });
  },

  paging: function(page, pageSize) {
    Dispatcher.dispatch({
      type:     ActionTypes.PAGING,
      page:     page,
      pageSize: pageSize
    });
  }
};
