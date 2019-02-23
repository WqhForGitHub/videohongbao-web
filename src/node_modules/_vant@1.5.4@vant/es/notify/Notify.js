import { use } from '../utils';
import PopupMixin from '../mixins/popup';
import { RED, WHITE } from '../utils/color';

var _use = use('notify'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  mixins: [PopupMixin],
  props: {
    message: [String, Number],
    color: {
      type: String,
      value: WHITE
    },
    background: {
      type: String,
      value: RED
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