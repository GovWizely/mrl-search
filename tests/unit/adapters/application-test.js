import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('adapter:application', 'ApplicationAdapter');

test('it exists', function() {
  var adapter = this.subject();
  ok(adapter);
});

test('buildUrl: query arguments', function() {
  var adapter = this.subject(),
    type = 'explorer@model:consolidated-screening-list-entry:';
  equal(
    adapter.buildUrl(type, {}),
    'http://localhost:3000/consolidated_screening_list/search'
  );

  equal(
    adapter.buildUrl(type, {page: 2}),
    'http://localhost:3000/consolidated_screening_list/search?offset=10'
  );
});

test('buildUrl: supported model types', function() {
  var adapter = this.subject(),
    type = 'explorer@model:faqs:';
  equal(
    adapter.buildUrl(type, {}),
    'http://localhost:3000/faqs/search'
  );

  throws(
    function() {
      adapter.buildUrl('foo-bar', {});
    },
    new Error('Type "foo-bar" not supported')
  );
});
