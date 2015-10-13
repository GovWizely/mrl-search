import DS from 'ember-data';
import ENV from 'explorer/config/environment';

export default DS.RESTAdapter.extend({

  find: function() {
    throw new Error("find() not implemented.");
  },
  createRecord: function() {
    throw new Error("createRecord() not implemented.");
  },
  updateRecord: function() {
    throw new Error("updateRecord() not implemented.");
  },
  deleteRecord: function() {
    throw new Error("deleteRecord() not implemented.");
  },

  findAll: function(store, type) {
    return this.ajax(this.buildUrl(type, {}), 'GET');
  },

  findQuery: function(store, type, query) {
    return this.ajax(this.buildUrl(type, query), 'GET');
  },

  buildUrl: function(type, query) {
    if (!query) {
      query = {page: 0};
    }
    var page = Math.max(query.page, 1),
      offset = 10 * (page - 1);

    delete query.page;

    return ENV.webservicesBaseURL + this.path(type) + this.queryString(offset, query);
  },

  path: function(type) {
    var supported = {
      'explorer@model:article:': 'search',
      'explorer@model:facet:': 'count'
    };
    return supported[type];
  },

  queryString: function(offset, query) {
    var params = [], key;

    if (offset > 0) {
      params.push('offset='+offset);
    }

    if (!query['q'] || query['q'] === 'undefined') {
      query['q'] = 'and';
    }

    for (key in query) {
      if (query[key] && query[key] !== 'undefined') {
        params.push(key+'='+query[key]);
      }
    }

    return ((params.length > 0) ? '?' + params.join('&') : '');
  },
});
