import { use } from '../utils';
import Button from '../button';
import RadioGroup from '../radio-group';
import AddressItem from './Item';

var _use = use('address-list'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

export default sfc({
  props: {
    list: Array,
    disabledList: Array,
    disabledText: String,
    addButtonText: String,
    value: [String, Number],
    switchable: {
      type: Boolean,
      default: true
    }
  },
  render: function render(h) {
    var _this = this;

    var getList = function getList(list, disabled) {
      return list.map(function (item, index) {
        return h(AddressItem, {
          "attrs": {
            "data": item,
            "disabled": disabled,
            "switchable": _this.switchable && !disabled
          },
          "key": item.id,
          "on": {
            "select": function select() {
              _this.$emit(disabled ? 'select-disabled' : 'select', item, index);
            },
            "edit": function edit() {
              _this.$emit(disabled ? 'edit-disabled' : 'edit', item, index);
            }
          }
        });
      });
    };

    var List = getList(this.list);
    var DisabledList = getList(this.disabledList, true);
    return h("div", {
      "class": bem()
    }, [this.$slots.top, h(RadioGroup, {
      "attrs": {
        "value": this.value
      },
      "on": {
        "input": function input(event) {
          return _this.$emit('input', event);
        }
      }
    }, [List]), this.disabledText && h("div", {
      "class": bem('disabled-text')
    }, [this.disabledText]), DisabledList, this.$slots.default, h(Button, {
      "attrs": {
        "square": true,
        "size": "large",
        "type": "danger",
        "text": this.addButtonText || t('add')
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