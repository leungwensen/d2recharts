'use strict';

let canvas;
if (document.querySelector('#d2recharts-canvas')) {
  canvas = document.querySelector('.d2recharts-canvas');
} else {
  canvas = document.createElement('canvas');
  canvas.id = 'd2recharts-canvas';
}
const ctx = canvas.getContext('2d');
ctx.font = '12px sans-serif';

module.exports = function guessTextWidth(text) {
  const metrics = ctx.measureText(text);
  return metrics.width;
};
