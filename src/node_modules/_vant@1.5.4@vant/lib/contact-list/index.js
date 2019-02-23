"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _icon = _interopRequireDefault(require("../icon"));

var _cell = _interopRequireDefault(require("../cell"));

var _button = _interopRequireDefault(require("../button"));

var _radio = _interopRequireDefault(require("../radio"));

var _radioGroup = _interopRequireDefault(require("../radio-group"));

var _use = (0, _utils.use)('contact-list'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

var _default = sfc({
  props: {
    value: null,
    list: Array,
    addText: String
  },
  render: function render(h) {
    var _this = this;

    return h("div", {
      "class": bem()
    }, [h(_radioGroup.default, {
      "attrs": {
        "value": this.value
      },
      "on": {
        "input": function input(event) {
          _this.$emit('input', event);
        }
      }
    }, [this.list.map(function (item, index) {
      return h(_cell.default, {
        "key": item.id,
        "attrs": {
          "isLink": true
        }
      }, [h(_radio.default, {
        "attrs": {
          "name": item.id
        },
        "on": {
          "click": function click() {
            _this.$emit('select', item, index);
          }
        }
      }, [h("div", {
        "class": bem('name')
      }, [item.name + "\uFF0C" + item.tel])]), h(_icon.default, {
        "slot": "right-icon",
        "attrs": {
          "name": "edit"
        },
        "class": bem('edit'),
        "on": {
          "click": function click() {
            _this.$emit('edit', item, index);
          }
        }
      })]);
    })]), h(_button.default, {
      "attrs": {
        "square": true,
        "size": "large",
        "type": "danger",
        "text": this.addText || t('addText')
      },
      "class": bem('add'),
      "on": {
        "click": function click() {
          _this.$emit('add');
        }
      }
    })]);
  }
});

exports.default = _default;