"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _icon = _interopRequireDefault(require("../icon"));

var _findParent = _interopRequireDefault(require("../mixins/find-parent"));

var _use = (0, _utils.use)('checkbox'),
    sfc = _use[0],
    bem = _use[1];

var _default = sfc({
  mixins: [_findParent.default],
  props: {
    name: null,
    value: null,
    disabled: Boolean,
    checkedColor: String,
    labelPosition: String,
    labelDisabled: Boolean,
    shape: {
      type: String,
      default: 'round'
    }
  },
  computed: {
    checked: {
      get: function get() {
        return this.parent ? this.parent.value.indexOf(this.name) !== -1 : this.value;
      },
      set: function set(val) {
        if (this.parent) {
          this.setParentValue(val);
        } else {
          this.$emit('input', val);
        }
      }
    },
    isDisabled: function isDisabled() {
      return this.parent && this.parent.disabled || this.disabled;
    },
    iconStyle: function iconStyle() {
      var checkedColor = this.checkedColor;

      if (checkedColor && this.checked && !this.isDisabled) {
        return {
          borderColor: checkedColor,
          backgroundColor: checkedColor
        };
      }
    }
  },
  watch: {
    value: function value(val) {
      this.$emit('change', val);
    }
  },
  created: function created() {
    this.findParent('van-checkbox-group');
  },
  methods: {
    toggle: function toggle(target) {
      if (!this.isDisabled && !(target === 'label' && this.labelDisabled)) {
        this.checked = !this.checked;
      }
    },
    setParentValue: function setParentValue(val) {
      var parent = this.parent;
      var value = parent.value.slice();

      if (val) {
        if (parent.max && value.length >= parent.max) {
          return;
        }
        /* istanbul ignore else */


        if (value.indexOf(this.name) === -1) {
          value.push(this.name);
          parent.$emit('input', value);
        }
      } else {
        var index = value.indexOf(this.name);
        /* istanbul ignore else */

        if (index !== -1) {
          value.splice(index, 1);
          parent.$emit('input', value);
        }
      }
    }
  },
  render: function render(h) {
    var _this = this;

    var CheckIcon = this.$scopedSlots.icon ? this.$scopedSlots.icon({
      checked: this.checked
    }) : h(_icon.default, {
      "attrs": {
        "name": "success"
      },
      "style": this.iconStyle
    });
    var Label = this.$slots.default && h("span", {
      "class": bem('label', [this.labelPosition, {
        disabled: this.isDisabled
      }]),
      "on": {
        "click": function click() {
          _this.toggle('label');
        }
      }
    }, [this.$slots.default]);
    return h("div", {
      "class": bem()
    }, [h("div", {
      "class": bem('icon', [this.shape, {
        disabled: this.isDisabled,
        checked: this.checked
      }]),
      "on": {
        "click": this.toggle
      }
    }, [CheckIcon]), Label]);
  }
});

exports.default = _default;