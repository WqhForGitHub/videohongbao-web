import { use, isDef } from '../utils';

var _use = use('info'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
  props: {
    info: [String, Number]
  },
  render: function render(h) {
    return isDef(this.info) && h("div", {
      "class": bem()
    }, [this.info]);
  }
});