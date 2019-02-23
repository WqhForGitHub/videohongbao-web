"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _popup = _interopRequireDefault(require("../mixins/popup"));

var _color = require("../utils/color");

var _use = (0, _utils.use)('notify'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  mixins: [_popup.default],
  props: {
    message: [String, Number],
    color: {
      type: String,
      value: _color.WHITE
    },
    background: {
      type: String,
      value: _color.RED
    },
    duration: {
      type: Number,
      value: 3000
    },
    lockScroll: {
      type: Boolean,
      default: false
    }
  },
  render: function render(h) {
    var style = {
      color: this.color,
      background: this.background
    };
    return h("transition", {
      "attrs": {
        "name": "van-slide-down"
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.value
      }],
      "class": bem(),
      "style": style
    }, [this.message])]);
  }
});

exports.default = _default;