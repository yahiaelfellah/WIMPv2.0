<template>
  <el-drawer
    v-model="isVisible"
    :before-close="handleClose"
    direction="rtl"
    size="50%"
  >
    <IFrame />
  </el-drawer>
</template>
<script>
import IFrame from "@/components/Cards/NodeRedIframeCard.vue";
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    device: {
      type: Object,
    },
  },
  component: {
    IFrame,
  },
  watch : { 
    visible : function(n,o)  { 
        this.isVisible = n ;
        console.log("Prop changed: ", n, " | was: ", o);

    }
  },
  data() {
    return {
      myIframe: null,
      isVisible: false,
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
};
</script>