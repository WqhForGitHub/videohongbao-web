"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _use = (0, _utils.use)('loading'),
    sfc = _use[0],
    bem = _use[1];

var DEFAULT_COLOR = '#c9c9c9';

var _default = sfc({
  props: {
    size: String,
    type: {
      type: String,
      default: 'circular'
    },
    color: {
      type: String,
      default: DEFAULT_COLOR
    }
  },
  render: function render(h) {
    var color = this.color,
        size = this.size,
        type = this.type;
    var colorType = color === 'white' || color === 'black' ? color : '';
    var style = {
      color: color === 'black' ? DEFAULT_COLOR : color,
      width: size,
      height: size
    };
    var Spin = [];

    if (type === 'spinner') {
      for (var i = 0; i < 12; i++) {
        Spin.push(h("i"));
      }
    }

    var Circular = type === 'circular' && h("svg", {
      "class": bem('circular'),
      "attrs": {
        "viewBox": "25 25 50 50"
      }
    }, [h("circle", {
      "attrs": {
        "cx": "50",
        "cy": "50",
        "r": "20",
        "fill": "none"
      }
    })]);
    return h("div", {
      "class": bem([type, colorType]),
      "style": style
    }, [h("span", {
      "class": bem('spinner', type)
    }, [Spin, Circular])]);
  }
});

exports.default = _default;