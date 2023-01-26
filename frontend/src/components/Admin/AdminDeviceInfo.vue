<template>
  <el-drawer
    v-model="isVisible"
    :before-close="handleClose"
    direction="rtl"
    size="60%"
  >
    <el-descriptions :title="device.name" :column="1">
      <el-descriptions-item label="Type">
        {{ device.type }}</el-descriptions-item
      >
      <el-descriptions-item label="Status">
      </el-descriptions-item>
      <el-descriptions-item label="Remarks">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address"
        >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>

    <el-space fill>
      <el-alert type="warning" show-icon>
        <p>
          You must specify 'Departement' label on the individal inputs.<br />The
          label will be created in the system so will be shown in the dropdown.
        </p>
      </el-alert>

      <iframe :src="src" :id="uuid" class="myIfr" frameborder="0"></iframe>
    </el-space>
  </el-drawer>
</template>
<script>
import { uuid } from "vue-uuid";

export default {
  components: {},
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
      console.log(this.device);

      console.log("Prop changed: ", n, " | was: ", o);
    },
    src: function (n, o) {
      // const el = document.getElementById("myIfr");
      // console.log(el);
      console.log(this.device);
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
.el-descriptions {
  margin-top: 20px;
}
.el-descriptions__label {
  font-weight: bold;
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dot {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 10px;
}

.dot:last-child {
  margin-right: 0px;
}
.wrapper7 {
  position: relative;
}

.dot7 {
  margin: 0;
  position: absolute;
}

.dot70 {
  width: 100px;
  height: 100px;
  background-color: #ffc300;
  z-index: 1;
}

.dot71 {
  width: 90px;
  height: 90px;
  background: #fff;
  z-index: 5;
  animation: expand7 3s linear infinite;
}

.dot72 {
  width: 60px;
  height: 60px;
  background: #ffc300;
  z-index: 10;
  animation: expand71 3s 500ms ease infinite;
}

.dot73 {
  width: 40px;
  height: 40px;
  background: #ffc300;
  z-index: 15;
  animation: expand71 3s 200ms ease infinite;
}

@keyframes expand7 {
  0%,
  100% {
    transform: scale(0.6);
  }
  50% {
    transform: scale(1);
  }
}

@keyframes expand71 {
  0%,
  100% {
    transform: scale(0.4);
  }
  50% {
    transform: scale(1);
  }
}
/* Style 7 Ends */
</style>