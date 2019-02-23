"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _utils = require("../utils");

var _button = _interopRequireDefault(require("../button"));

var _popup = _interopRequireDefault(require("../mixins/popup"));

var _use = (0, _utils.use)('dialog'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

var _default = sfc({
  mixins: [_popup.default],
  props: {
    title: String,
    message: String,
    callback: Function,
    className: [String, Object, Array],
    beforeClose: Function,
    messageAlign: String,
    confirmButtonText: String,
    cancelButtonText: String,
    showCancelButton: Boolean,
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      loading: {
        confirm: false,
        cancel: false
      }
    };
  },
  methods: {
    handleAction: function handleAction(action) {
      var _this = this;

      this.$emit(action);

      if (this.beforeClose) {
        this.loading[action] = true;
        this.beforeClose(action, function (state) {
          if (state !== false) {
            _this.onClose(action);
          }

          _this.loading[action] = false;
        });
      } else {
        this.onClose(action);
      }
    },
    onClose: function onClose(action) {
      this.$emit('input', false);
      this.callback && this.callback(action);
    }
  },
  render: function render(h) {
    var _bem,
        _this2 = this;

    if (!this.shouldRender) {
      return;
    }

    var title = this.title,
        message = this.message,
        messageAlign = this.messageAlign;
    var children = this.$slots.default;
    var Title = title && h("div", {
      "class": bem('header', {
        isolated: !message && !children
      })
    }, [title]);
    var Content = (children || message) && h("div", {
      "class": bem('content')
    }, [children || h("div", {
      "domProps": {
        "innerHTML": message
      },
      "class": bem('message', (_bem = {
        'has-title': title
      }, _bem[messageAlign] = messageAlign, _bem))
    })]);
    var hasButtons = this.showCancelButton && this.showConfirmButton;
    var ButtonGroup = h("div", {
      "class": ['van-hairline--top', bem('footer', {
        buttons: hasButtons
      })]
    }, [h(_button.default, {
      "directives": [{
        name: "show",
        value: this.showCancelButton
      }],
      "attrs": {
        "size": "large",
        "loading": this.loading.cancel,
        "text": this.cancelButtonText || t('cancel')
      },
      "class": bem('cancel'),
      "on": {
        "click": function click() {
          _this2.handleAction('cancel');
        }
      }
    }), h(_button.default, {
      "directives": [{
        name: "show",
        value: this.showConfirmButton
      }],
      "attrs": {
        "size": "large",
        "loading": this.loading.confirm,
        "text": this.confirmButtonText || t('confirm')
      },
      "class": [bem('confirm'), {
        'van-hairline--left': hasButtons
      }],
      "on": {
        "click": function click() {
          _this2.handleAction('confirm');
        }
      }
    })]);
    return h("transition", {
      "attrs": {
        "name": "van-dialog-bounce"
      }
    }, [h("div", {
      "directives": [{
        name: "show",
        value: this.value
      }],
      "class": [bem(), this.className]
    }, [Title, Content, ButtonGroup])]);
  }
});

exports.default = _default;