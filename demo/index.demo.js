'use strict';
/**
 * index.demo module
 * @module index.demo
 * @see module:index
 */
const d2recharts = require('d2recharts');
const React = require('react');
const ReactDOM = require('react-dom');
require('./index.less');

const data = [
  {genre: 'Sports', sold: 275, price: 30},
  {genre: 'Strategy', sold: 115, price: 100},
  {genre: 'Action', sold: 120, price: 130},
  {genre: 'Shooter', sold: 350, price: 120},
  {genre: 'Other', sold: 150, price: 106}
];

ReactDOM.render(
  (
    /*<d2recharts.D2Bar data={data}/>*/
    /*<d2recharts.D2Line data={data}/>*/
    <d2recharts.D2Pie data={data}/>
    /*<d2recharts.D2Gauge data={data} rowIndex="2" measures={['price']}/>*/
  ),
  document.getElementById('canvas')
);

