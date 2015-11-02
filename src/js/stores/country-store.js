var _countries = [
  { label: 'Angola',     value: 'Angola'     },
  { label: 'Belgium',    value: 'Belgium'    },
  { label: 'Chile',      value: 'Chile'      },
  { label: 'Colombia',   value: 'Colombia'   },
  { label: 'Finland',    value: 'Finland'    },
  { label: 'France',     value: 'France'     },
  { label: 'Hungary',    value: 'Hungary'    },
  { label: 'Kuwait',     value: 'Kuwait'     },
  { label: 'Lebanon',    value: 'Lebanon'    },
  { label: 'Lesotho',    value: 'Lesotho'    },
  { label: 'Paraguay',   value: 'Paraguay'   },
  { label: 'Uzbekistan', value: 'Uzbekistan' }
];

module.exports = {
  getCountries: function(callback) {
    callback(_countries);
  }
};
