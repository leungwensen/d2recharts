// const $ = require('jquery');
const d2recharts = require('d2recharts');
const lang = require('zero-lang');

const DataSet = d2recharts.DataSet;

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
    {name: 'sold', comments: '销量', type: 'number'}
  ]
};

describe('data-set', () => {
  it('new DataSet(source)', () => {
    assert.doesNotThrow(
      () => {
        const dataSet = new DataSet(lang.clone(source));
        console.log(dataSet);
      },
      Error,
      'New Instance'
    );
  });

  it('DataSet.mockFromMeta(meta)', () => {
    assert.doesNotThrow(
      () => {
        const dataSet = DataSet.mockFromMeta(source.schema);
        console.log(dataSet);
      },
      Error,
      'mock from meta'
    );
  });
});
