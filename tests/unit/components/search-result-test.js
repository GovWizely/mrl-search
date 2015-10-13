import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('search-result', 'SearchResultComponent', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function() {
  expect(2);

  // creates the component instance
  // TODO replace arg with a mocked model instance.
  var component = this.subject({document: {get: function() {}}});
  equal(component._state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component._state, 'inDOM');
});
