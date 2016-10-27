// const $ = require('jquery');
const d2recharts = require('d2recharts');
const lang = require('zero-lang');

const assert = chai.assert;
const source = {
  data: [
    {genre: 'Sports', sold: 275},
    {genre: 'Strategy', sold: 115},
    {genre: 'Action', sold: 120},
    {genre: 'Shooter', sold: 350},
    {genre: 'Other', sold: 150}
  ],
  schema: [
    {name: 'genre', comments: '种类'},
    {name: 'sold', comments: '销量'}
  ]
};

describe('data-set', () => {
  it('new DataSet(source)', () => {
    assert.doesNotThrow(
      () => {
        const dataSet = new d2recharts.DataSet(lang.clone(source));
        console.log(dataSet);
      },
      Error,
      'New Instance'
    );
  });
});
