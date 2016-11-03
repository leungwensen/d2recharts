d2recharts
==========

**Data Driven** echarts wrapped as react components.

## what?

![data-flow](doc/data-flow.png)

## Why?

To make the path from data to chart shorter.

## Install

```shell
npm i d2recharts --save
```

## Usage

A typical use case is like:

```jsx
<D2Pie
    data={[
       {value:335, name:'直接访问'},
       {value:310, name:'邮件营销'},
       {value:234, name:'联盟广告'},
       {value:135, name:'视频广告'},
       {value:1548, name:'搜索引擎'}
    ]}
/>
```

Simplest use case:

```jsx
const data = [
    // data goes here
];
<D2RechartsSmart data={data} />
```

If you want fully functionality of echarts:

```jsx
const option = {
    // echarts option goes here
};
<D2Recharts option={option} />
```

## [Demo](./demo)

## [API](./doc/api.md)

## [Roadmap](./doc/roadmap.md)

## [Contributing](./doc/contributing.md)
