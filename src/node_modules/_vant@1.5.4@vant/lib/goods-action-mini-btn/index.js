"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _icon = _interopRequireDefault(require("../icon"));

var _routerLink = _interopRequireDefault(require("../mixins/router-link"));

var _use = (0, _utils.use)('goods-action-mini-btn'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  mixins: [_routerLink.default],
  props: {
    text: String,
    info: [String, Number],
    icon: String,
    iconClass: String
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
      this.routerLink();
    }
  },
  render: function render(h) {
    return h("div", {
      "class": [bem(), 'van-hairline'],
      "on": {
        "click": this.onClick
      }
    }, [h(_icon.default, {
      "class": [bem('icon'), this.iconClass],
      "attrs": {
        "info": this.info,
        "name": this.icon
      }
    }), this.$slots.default || this.text]);
  }
});

exports.default = _default;