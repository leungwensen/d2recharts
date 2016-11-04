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
  {genre: 'Sports', sold: 275},
  {genre: 'Strategy', sold: 115},
  {genre: 'Action', sold: 120},
  {genre: 'Shooter', sold: 350},
  {genre: 'Other', sold: 150}
];

ReactDOM.render(
  (
    /*<d2recharts.D2Bar data={data}/>*/
    <d2recharts.D2Line data={data}/>
    /*<d2recharts.D2Pie data={data}/>*/
    /*<d2recharts.D2Gauge data={data} dataRow="2"/>*/
  ),
  document.getElementById('canvas')
);
