import _extends from "@babel/runtime/helpers/esm/extends";
import { use, isAndroid } from '../utils';
import Cell from '../cell';
import Field from '../field';

var _use = use('address-edit-detail'),
    sfc = _use[0],
    bem = _use[1],
    t = _use[2];

var android = isAndroid();
export default sfc({
  props: {
    value: String,
    error: Boolean,
    focused: Boolean,
    detailRows: Number,
    searchResult: Array,
    showSearchResult: Boolean
  },
  methods: {
    onSelect: function onSelect(express) {
      this.$emit('select-search', express);
      this.$emit('input', ((express.address || '') + " " + (express.name || '')).trim());
    }
  },
  render: function render(h) {
    var _this = this;

    var value = this.value,
        focused = this.focused,
        searchResult = this.searchResult;
    var Finish = value && focused && android && h("div", {
      "slot": "icon",
      "class": bem('finish'),
      "on": {
        "click": function click() {
          _this.$refs.field.blur();
        }
      }
    }, [t('complete')]);
    var SearchList = focused && searchResult && this.showSearchResult && searchResult.map(function (express) {
      return h(Cell, {
        "key": express.name + express.address,
        "attrs": {
          "title": express.name,
          "label": express.address,
          "icon": "location-o",
          "clickable": true
        },
        "on": {
          "click": function click() {
            _this.onSelect(express);
          }
        }
      });
    });
    return h(Cell, {
      "class": bem()
    }, [h(Field, {
      "attrs": {
        "autosize": true,
        "rows": this.detailRows,
        "clearable": !android,
        "type": "textarea",
        "maxlength": "200",
        "value": this.value,
        "error": this.error,
        "label": t('label'),
        "placeholder": t('placeholder')
      },
      "ref": "field",
      "on": _extends({}, this.$listeners)
    }, [Finish]), SearchList]);
  }
});