  var _industries = [
    {label: 'Aerospace & Defense', value: 'Aerospace & Defense'},
    {label: 'Agribusiness', value: 'Agribusiness'},
    {label: 'Apparel & Textiles', value: 'Apparel & Textiles'},
    {label: 'Automotive & Ground Transportation', value: 'Automotive & Ground Transportation'},
    {label: 'Chemicals, Petrochemicals & Composites', value: 'Chemicals, Petrochemicals & Composites'},
    {label: 'Construction, Building & Heavy Equipment', value: 'Construction, Building & Heavy Equipment'},
    {label: 'Consumer Goods & Home Furnishings', value: 'Consumer Goods & Home Furnishings'},
    {label: 'Energy & Mining', value: 'Energy & Mining'},
    {label: 'Environmental Technologies', value: 'Environmental Technologies'},
    {label: 'Food Processing & Packaging', value: 'Food Processing & Packaging'},
    {label: 'Health Technologies', value: 'Health Technologies'},
    {label: 'Industrial Equipment & Supplies', value: 'Industrial Equipment & Supplies'},
    {label: 'Information & Communication', value: 'Information & Communication'},
    {label: 'Marine Industries', value: 'Marine Industries'},
    {label: 'Paper, Printing, Graphic Arts', value: 'Paper, Printing, Graphic Arts'},
    {label: 'Security & Safety', value: 'Security & Safety'},
    {label: 'Services', value: 'Services'},
    {label: 'Used & Reconditioned Equipment', value: 'Used & Reconditioned Equipment'}
  ];

module.exports = {
  getIndustries: function(callback) {
    callback(_industries);
  }
};
