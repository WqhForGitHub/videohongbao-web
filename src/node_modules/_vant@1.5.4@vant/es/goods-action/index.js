import { use } from '../utils';

var _use = use('goods-action'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  render: function render(h) {
    return h("div", {
      "class": bem()
    }, [this.$slots.default]);
  }
});