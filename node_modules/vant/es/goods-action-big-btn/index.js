import { use } from '../utils';
import Button from '../button';
import RouterLink from '../mixins/router-link';

var _use = use('goods-action-big-btn'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  mixins: [RouterLink],
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
    return h(Button, {
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