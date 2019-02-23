"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _icon = _interopRequireDefault(require("../icon"));

var _use = (0, _utils.use)('nav-bar'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  props: {
    title: String,
    fixed: Boolean,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    border: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 1
    }
  },
  render: function render(h) {
    var _this = this;

    return h("div", {
      "class": [bem({
        fixed: this.fixed
      }), {
        'van-hairline--bottom': this.border
      }],
      "style": {
        zIndex: this.zIndex
      }
    }, [h("div", {
      "class": bem('left'),
      "on": {
        "click": function click() {
          _this.$emit('click-left');
        }
      }
    }, [this.$slots.left || [this.leftArrow && h(_icon.default, {
      "class": bem('arrow'),
      "attrs": {
        "name": "arrow-left"
      }
    }), this.leftText && h("span", {
      "class": bem('text')
    }, [this.leftText])]]), h("div", {
      "class": [bem('title'), 'van-ellipsis']
    }, [this.$slots.title || this.title]), h("div", {
      "class": bem('right'),
      "on": {
        "click": function click() {
          _this.$emit('click-right');
        }
      }
    }, [this.$slots.right || this.rightText && h("span", {
      "class": bem('text')
    }, [this.rightText])])]);
  }
});

exports.default = _default;