"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _icon = _interopRequireDefault(require("../icon"));

var _cell = _interopRequireDefault(require("../cell"));

var _radio = _interopRequireDefault(require("../radio"));

var _use = (0, _utils.use)('address-item'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  props: {
    data: Object,
    disabled: Boolean,
    switchable: Boolean
  },
  methods: {
    onSelect: function onSelect() {
      if (this.switchable) {
        this.$emit('select');
      }
    }
  },
  render: function render(h) {
    var _this = this;

    var data = this.data,
        disabled = this.disabled,
        switchable = this.switchable;
    return h(_cell.default, {
      "class": bem({
        disabled: disabled,
        unswitchable: !switchable
      }),
      "attrs": {
        "is-link": !disabled && switchable
      },
      "on": {
        "click": this.onSelect
      }
    }, [h(_radio.default, {
      "attrs": {
        "name": data.id
      }
    }, [h("div", {
      "class": bem('name')
    }, [data.name + "\uFF0C" + data.tel]), h("div", {
      "class": bem('address')
    }, [data.address])]), h(_icon.default, {
      "slot": "right-icon",
      "attrs": {
        "name": "edit"
      },
      "class": bem('edit'),
      "on": {
        "click": function click(event) {
          event.stopPropagation();

          _this.$emit('edit');
        }
      }
    })]);
  }
});

exports.default = _default;