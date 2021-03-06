'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _cssnanoUtilGetMatch = require('cssnano-util-get-match');

var _cssnanoUtilGetMatch2 = _interopRequireDefault(_cssnanoUtilGetMatch);

var _map = require('./lib/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getMatch = (0, _cssnanoUtilGetMatch2.default)(_map2.default);

function evenValues(list, index) {
    return index % 2 === 0;
}

function transform(node) {
    const { nodes } = (0, _postcssValueParser2.default)(node.value);
    if (nodes.length === 1) {
        return;
    }
    const match = getMatch(nodes.filter(evenValues).map(n => n.value.toLowerCase()));
    if (match) {
        node.value = match;
    }
}

exports.default = _postcss2.default.plugin('postcss-normalize-display-values', () => {
    return css => css.walkDecls(/display/i, transform);
});
module.exports = exports['default'];