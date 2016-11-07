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
      /*<d2recharts.D2Bar data={csv}/>*/
      /*<d2recharts.D2Line data={csv}/>*/
      <d2recharts.D2Pie data={csv} dimension="统计时间" measures={["年末人口"]}/>
      /*<d2recharts.D2Radar data={csv}/>*/
      /*<d2recharts.D2Gauge data={csv} rowIndex="2" measures={['price']}/>*/
    ),
    document.getElementById('canvas')
  );
}, 'text');


