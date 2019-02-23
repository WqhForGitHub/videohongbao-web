import { use } from '../utils';
import Icon from '../icon';
import Cell from '../cell';
import Radio from '../radio';

var _use = use('address-item'),
    sfc = _use[0],
    bem = _use[1];

export default sfc({
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
    return h(Cell, {
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
    }, [h(Radio, {
      "attrs": {
        "name": data.id
      }
    }, [h("div", {
      "class": bem('name')
    }, [data.name + "\uFF0C" + data.tel]), h("div", {
      "class": bem('address')
    }, [data.address])]), h(Icon, {
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