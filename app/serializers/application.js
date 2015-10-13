import DS from 'ember-data';

export default DS.JSONSerializer.extend({

  extractArray: function(store, type, payload) {
    var models;
    if (type.toString() === 'explorer@model:facet:') {
      models = this.extractFacets(payload, store);
    } else {
      models = payload.results.map(function(json) {
        return this.extractSingle(store, type, json);
      }, this);
    }
    return models;
  },

  extractSingle: function(store, type, payload) {
    if (!payload.id) {
      payload.id = this.generateId(type, payload);
    }
    return payload;
  },

  extractFacets: function(payload, store) {
    var facetsInfo = {};
    var facets = [];

    payload.aggregations.industries.forEach(function(item) {
      var values = this.extractFacet(item);
      var facetName = values[0], industryName = values[1];
      if (!facetsInfo[facetName]) { facetsInfo[facetName] = []; }
      facetsInfo[facetName].push(industryName);
    }, this);

    for (var name in facetsInfo) {
      if (facetsInfo.hasOwnProperty(name)) {
        var facet = {id: name, name: name, industries: []};

        facetsInfo[name].forEach(function(item) {
          var industry = {id: item, name: item, facet: name};
          if (store) {
            store.push('industry', industry);
          }
          if (industry.name !== facet.name) {
            facet.industries.push(industry.id);
          }
        });

        facets.push(facet);
      }
    }

    return facets;
  },

  extractFacet: function(item) {
    var key = item.key.substring(1);
    var result = key.split('/');
    var facet = result[0];
    var industry;

    if (result.length === 2) {
      industry = result[1];
    } else {
      // Create an industry that's just named after the Facet.
      industry = result[0];
    }

    return [facet, industry];
  },

  extractMeta: function(store, type, payload) {
    if (payload) {
      var metaData = {
        total: payload.metadata.total,
        facets: this.extractFacets(payload)
      };
      store.metaForType(type, metaData);
    }
  },

  generateId: function(type, payload) {
    var representation = type;
    for (var prop in payload) {
      if (payload.hasOwnProperty(prop) && typeof(payload[prop]) === 'string') {
        representation += payload[prop];
      }
    }
    return md5(representation);
  }
});
