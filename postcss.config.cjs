const path = require('path');
const postcssMixins = require('postcss-mixins');
const postcssAdvancedVar = require('postcss-advanced-variables');
const postcssNested = require('postcss-nested');
// const postcss = require('postcss');
const postcssCalc = require("postcss-calc");
const postcssUrl = require('postcss-url');
const postcssPresetEnv = require('postcss-preset-env');
// cspell:ignore pxtorem
const postcssPixelsToRem = require('postcss-pxtorem');
const cssnano = require('cssnano');
const postcssEach = require('postcss-each');

module.exports = {
  plugins: [
    postcssAdvancedVar,
    postcssNested,
    postcssPresetEnv({
      stage: 2,
      preserve: false,
      autoprefixer: {
        cascade: false,
        grid: 'no-autoplace',
      },
      importFrom: {
        customMedia: {
          '--sm': '(min-width: 576px)',
          '--md': '(min-width: 768px)',
          '--down': '(max-width: 991px)',
          '--up': '(min-width: 992px)',
          '--lg': '(min-width: 992px)',
          '--xl': '(min-width: 1200px)',
          '--xxl': '(min-width: 1400px)',
        }
      },
      features: {
        'custom-properties': false,
        'blank-pseudo-class': false,
        'focus-visible-pseudo-class': false,
        'focus-within-pseudo-class': false,
        'has-pseudo-class': false,
        'image-set-function': false,
        'prefers-color-scheme-query': false,
      }
    }),
    postcssMixins({
      mixinsDir: path.join(__dirname, 'mixins')
    }),
    postcssCalc,
    postcssEach,
    postcssPixelsToRem({
        propList: [
          '*',
          '!background-position',
          '!border',
          '!border-width',
          '!box-shadow',
          '!border-top*',
          '!border-right*',
          '!border-bottom*',
          '!border-left*',
          '!border-start*',
          '!border-end*',
          '!outline*',
        ],
        mediaQuery: true,
        minPixelValue: 3,
    }),
    postcssUrl({
      filter: '**/*.svg',
      url: 'inline',
      optimizeSvgEncode: true,
    }),
    cssnano()
  ],
};
