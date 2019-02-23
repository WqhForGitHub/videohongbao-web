"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _button = _interopRequireDefault(require("../button"));

var _routerLink = _interopRequireDefault(require("../mixins/router-link"));

var _use = (0, _utils.use)('goods-action-big-btn'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  mixins: [_routerLink.default],
  props: {
    text: String,
    primary: Boolean,
    loading: Boolean,
    disabled: Boolean
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
      this.routerLink();
    }
  },
  render: function render(h) {
    return h(_button.default, {
      "attrs": {
        "square": true,
        "size": "large",
        "loading": this.loading,
        "disabled": this.disabled,
        "type": this.primary ? 'danger' : 'warning'
      },
      "class": bem(),
      "on": {
        "click": this.onClick
      }
    }, [this.$slots.default || this.text]);
  }
});

exports.default = _default;