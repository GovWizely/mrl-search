var _       = require('lodash');
var request = require('axios');

var parser  = require('../utils/industry-parser');

const ENDPOINT = 'https://pluto.kerits.org/v1/articles/count';

var _industries = {};
var _setIndustries = function(results) {
  _industries = parser.parseIndustry(results);
};

module.exports = {
  getIndustries: function(callback) {
    if (_.isEmpty(_industries)) {
      request
        .get(ENDPOINT)
        .then(function(response) {
          _setIndustries(response.data.aggregations.industries);
          callback(_industries);
        });
    } else {
      callback(_industries);
    }
  }
};
