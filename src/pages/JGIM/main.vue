<template>
  <div class="video">
    132
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import store from "../../store";
import IM from '../../common/im'
import { statusCode } from "../../config/api.cfg";
export default {
  store,
  computed: {
    ...mapGetters(["userInfo"])
  },
  data() {
    return {
      userlist: null,
      size: 8,
      page: 0,
      pages: null,
      img: ""
    };
  },
  methods: {
    async init(){
      const res = await IM.init()
      console.log(res)
    }
  },
  created () {
    // console.log(123)
    // IM.init()
  },
  onShow(){
  },
   onLoad(){
     this.init();
    // IM.register()
    // IM.Connect()
  },
};
</script>
