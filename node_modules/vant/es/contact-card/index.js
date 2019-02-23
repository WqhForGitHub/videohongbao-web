import { use } from '../utils';
import Cell from '../cell';

var _use = use('contact-card'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

export default sfc({
  props: {
    tel: String,
    name: String,
    addText: String,
    editable: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'add'
    }
  },
  methods: {
    onClick: function onClick(event) {
      if (this.editable) {
        this.$emit('click', event);
      }
    }
  },
  render: function render(h) {
    var type = this.type;
    return h(Cell, {
      "attrs": {
        "center": true,
        "border": false,
        "isLink": this.editable,
        "icon": type === 'edit' ? 'contact' : 'add-square'
      },
      "class": bem([type]),
      "on": {
        "click": this.onClick
      }
    }, [type === 'add' ? this.addText || t('addText') : [h("div", [t('name') + "\uFF1A" + this.name]), h("div", [t('tel') + "\uFF1A" + this.tel])]]);
  }
});