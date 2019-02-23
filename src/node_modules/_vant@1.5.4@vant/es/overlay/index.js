import _extends from "@babel/runtime/helpers/esm/extends";
import { use } from '../utils';

var _use = use('overlay'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  props: {
    zIndex: Number,
    visible: Boolean,
    className: String,
    customStyle: Object
  },
  render: function render(h) {
    var _this = this;

    var style = _extends({
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