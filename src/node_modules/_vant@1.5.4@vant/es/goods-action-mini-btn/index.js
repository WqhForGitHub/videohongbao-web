import { use } from '../utils';
import Icon from '../icon';
import RouterLink from '../mixins/router-link';

var _use = use('goods-action-mini-btn'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  mixins: [RouterLink],
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
    }, [h(Icon, {
      "class": [bem('icon'), this.iconClass],
      "attrs": {
        "info": this.info,
        "name": this.icon
      }
    }), this.$slots.default || this.text]);
  }
});