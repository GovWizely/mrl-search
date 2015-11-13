import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import ArticleList from '../../src/js/components/article-list';

const { renderIntoDocument, scryRenderedDOMComponentsWithTag } = TestUtils;

describe('ArticleList', () => {
  it('renders a list of articles', () => {
    var articles = [
      { id: 1, url: 'http://www.example.com', title: 'article#1', description: 'Lorem Ipsum', industries: null, ita_industries: null, countries: null, expiration_date: null, report_type: null },
      { id: 2, url: 'http://www.example.com', title: 'article#2', description: 'Lorem Ipsum', industries: null, ita_industries: null, countries: null, expiration_date: null, report_type: null },
      { id: 3, url: 'http://www.example.com', title: 'article#3', description: 'Lorem Ipsum', industries: null, ita_industries: null, countries: null, expiration_date: null, report_type: null }
    ];
    const component = renderIntoDocument(
      <ArticleList articles={ articles }/>
    );

    const articlesDOM = scryRenderedDOMComponentsWithTag(component, 'article');
    expect(articlesDOM.length).to.equal(3);
  });
});
