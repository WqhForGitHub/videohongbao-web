"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _utils = require("../utils");

var _use = (0, _utils.use)('overlay'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  props: {
    zIndex: Number,
    visible: Boolean,
    className: String,
    customStyle: Object
  },
  render: function render(h) {
    var _this = this;

    var style = (0, _extends2.default)({
      zIndex: this.zIndex
    }, this.customStyle);
    return h("transition", {
      "attrs": {
        "name": "van-fade"
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.visible
      }],
      "style": style,
      "class": [bem(), this.className],
      "on": {
        "touchmove": function touchmove(event) {
          event.preventDefault();
          event.stopPropagation();
        },
        "click": function click(event) {
          _this.$emit('click', event);
        }
      }
    })]);
  }
});

exports.default = _default;