'use strict';
/**
 * index.demo module
 * @module index.demo
 * @see module:index
 */
const d2recharts = require('d2recharts');
const React = require('react');
const $ = require('jquery');
const ReactDOM = require('react-dom');
require('./index.less');

const data = [
  {genre: 'Sports', sold: 275, price: 30},
  {genre: 'Strategy', sold: 115, price: 100},
  {genre: 'Action', sold: 120, price: 130},
  {genre: 'Shooter', sold: 350, price: 120},
  {genre: 'Other', sold: 150, price: 106}
];

$.get('./data/csv/population-china.csv', (csv) => {
  ReactDOM.render(
    (
      <div>
        <d2recharts.Funnel data={csv}/>
        <d2recharts.Smart data={csv}/>
        <d2recharts.Indicator data={csv} height="auto"/>
      </div>
    ),
    document.getElementById('canvas')
  );
}, 'text');
