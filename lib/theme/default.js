'use strict';
/**
 * d2recharts defautl theme
 * @module default
 * @see module:index
 */
const echarts = require('echarts');
const warmColorTheme = require('./warm-color.json');
const constant = require('../constant');

echarts.registerTheme(constant.DEFAULT_THEME_NAME, warmColorTheme);
echarts.registerTheme('warm-color', warmColorTheme);
