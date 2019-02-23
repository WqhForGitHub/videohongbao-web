"use strict";

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _use = (0, _utils.use)('info'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  props: {
    info: [String, Number]
  },
  render: function render(h) {
    return (0, _utils.isDef)(this.info) && h("div", {
      "class": bem()
    }, [this.info]);
  }
});

exports.default = _default;