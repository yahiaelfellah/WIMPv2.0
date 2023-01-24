<template>
  <el-drawer
    v-model="isVisible"
    :before-close="handleClose"
    direction="rtl"
    size="50%"
  >
    <!-- <IFrame /> -->
    <iframe :src="src" :id="uuid" class="myIfr" frameborder="0"></iframe>
  </el-drawer>
</template>
<script>
import { uuid } from "vue-uuid";
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    device: {
      type: Object,
    },
  },

  watch: {
    visible: function (n, o) {
      this.isVisible = n;
      console.log("Prop changed: ", n, " | was: ", o);
    },
    src: function (n, o) {
      // const el = document.getElementById("myIfr");
      // console.log(el);
      console.log("Prop changed: ", n, " | was: ", o);
      // if (el) {
      //   document.getElementById("myIfr").src =
      //     document.getElementById("myIfr").src;

      // }
    },
  },

  data() {
    return {
      myIframe: null,
      isVisible: false,
      uuid: uuid.v1(),
    };
  },
  methods: {
    handleClose() {
      this.$emit("cancel");
    },
    onLoad(frame) {
      this.myIframe = frame.contentWindow;
    },
  },
  unmounted() {
    console.log("Child unmounted()");
  },
};
</script>
<style>
.myIfr {
  width: 100%;
  height: 500px;
  border: 0px;
  border-radius: 3px;
}
</style>