"use strict";
/**
 * index.demo module
 * @module index.demo
 * @see module:index
 */
const d2recharts = require("d2recharts");
const React = require("react");
// const $ = require("jquery");
const ReactDOM = require("react-dom");
require("./index.less");

const data = {
  data: [
    {genre: "Sports", sold: 275, price: 30},
    {genre: "Strategy", sold: 115, price: 100},
    {genre: "Action", sold: 120, price: 130},
    {genre: "Shooter", sold: 350, price: 120},
    {genre: "Other", sold: 150, price: 106}
  ],
  schema: [
    {name: "genre", comments: "分类"},
    {name: "sold", comments: "销量"},
    // {name: "price", comments: "价格"},
    {name: "xxx", comments: "yyy"},
  ]
};

const before = Date.now();
const padding = 'none';

ReactDOM.render(
  (
    <div>
      <d2recharts.Bar padding={padding} data={data}/>
      <d2recharts.Line padding={padding} data={data}/>
      <d2recharts.Scatter padding={padding} data={data}/>
      <d2recharts.Funnel padding={padding} data={data}/>
      <d2recharts.Gauge padding={padding} data={data}/>
      <d2recharts.Indicator padding={padding} data={data} height="auto"/>
      <d2recharts.Pie padding={padding} data={data}/>
      <d2recharts.Radar padding={padding} data={data}/>
      <d2recharts.Smart padding={padding} data={data}/>
    </div>
  ),
  document.getElementById("canvas")
);
console.log(Date.now() - before);
