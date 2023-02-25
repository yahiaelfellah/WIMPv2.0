<template>
  <el-row :gutter="24">
    <el-col :span="24">
      <el-card class="box-card container">
        <template #header>
          <div class="card-header">
            <el-button
              color="#7325ef"
              plain
              round
              @click="() => (dialogFormVisible = true)"
              ><el-icon><Plus /></el-icon> Add
            </el-button>
            <span class="card-title"> Click on device card for more infos</span>
            <DeviceForm
              :visible="dialogFormVisible"
              @close="dialogFormVisible = false"
              @refresh="getData()"
            />
          </div>
        </template>
        <el-scrollbar v-if="!isEmpty">
          <el-skeleton :loading="loading" animated :count="5" :throttle="500">
            <template #template>
              <div id="skeleton-item">
                <el-skeleton-item
                  variant="image"
                  style="width: 200px; height: 200px"
                />
                <div style="padding: 14px">
                  <el-skeleton-item variant="h3" style="width: 50%" />
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-items: space-between;
                      margin-top: 16px;
                      height: 16px;
                    "
                  >
                    <el-skeleton-item
                      variant="text"
                      style="margin-right: 16px"
                    />
                    <el-skeleton-item variant="text" style="width: 30%" />
                  </div>
                </div>
              </div>
            </template>
            <template #default>
              <div class="scrollbar-flex-content">
                <el-col :span="4" v-for="(item, i) in devices" :key="item">
                  <el-card
                    v-wave="{
                      color: 'var(--el-color-primary)',
                      startingOpacity: 0.5,
                      easing: 'ease-in',
                    }"
                    class="box-card"
                    shadow="hover"
                    @click="infoVisibles[i] = true"
                  >
                    <el-avatar :icon="Watch" :size="50"></el-avatar>
                    <!-- <el-icon color="#409EFC" class="no-inherit" :size="50"
                      ><Watch v-if="isWatch(item.type)"
                    /></el-icon> -->
                    <div class="card-value">{{ item.name }}</div>
                    <div class="card-title">{{ item.type }}</div>
                    <!-- <div class="card-status">
                      <el-button type="primary" plain>Show flow</el-button>
                    </div> -->
                    <div class="card-status">
                        <span class="status" :class="{ 'online':isOnline} "></span>
                    </div>
                  </el-card>
                  <DeviceInfo
                    :visible="infoVisibles[i]"
                    :src="srcs[i]"
                    :device="item"
                    @cancel="infoVisibles[i] = false"
                  />
                </el-col>
              </div>
            </template>
          </el-skeleton>
        </el-scrollbar>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { deviceService } from "../../services/device.service";
import DeviceInfo from "./AdminDeviceInfo.vue";
import { Watch } from "@element-plus/icons-vue";
import DeviceForm from "./AdminDeviceForm.vue";


export default {
  components: {
    // Watch,
    DeviceInfo,
    DeviceForm,
  },
  computed: {
    isEmpty() {
      return this.devices.length === 0;
    },
  },
  methods: {
    getData() {
      this.loading = true;
      deviceService.getAll().then((res) => {
        this.devices = res.data;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }).catch((ex) => {
        console.info(ex);
      });
    },
    getDeviceStatus(){

    },
    isWatch(type) {
      return type === "watch";
    },

    getSource(index) {
      if (index === 0) {
        return "http://127.0.0.1:8000/red/#flow/43cfa3f5.540a8c";
      }
      else {
        return "http://127.0.0.1:8000/red/#flow/940cf029.f22d9";
      }
    },
  },

  mounted() {
    this.devices = [];
    this.getData();
  },
  data() {
    return {
      devices: [],
      loading: true,
      dialogFormVisible: false,
      Watch,
      index: 0,
      isOnline : true,
      srcs: [
        "http://127.0.0.1:8000/red/#flow/43cfa3f5.540a8c",
        "http://127.0.0.1:8000/red/#flow/940cf029.f22d9",
      ],
      infoVisibles: [false, false],
    };
  },
};
</script>
<style>
#skeleton-container {
  display: flex;
  flex-direction: row;
}
.card-header {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
}
.el-card__header {
  padding: calc(var(--el-card-padding) - 2px) var(--el-card-padding);
  border-bottom: 0px solid var(--el-card-border-color) !important;
  box-sizing: border-box;
}
.scrollbar-flex-content {
  display: flex;
}
.el-skeleton {
  display: flex;
  justify-content: space-around;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-danger-light-9);
  color: var(--el-color-danger);
}
.card {
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 250px;
  margin: 10px;
  padding: 20px;
  box-shadow: 0 20px 40px 0 rgba(204, 204, 204, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  position: relative;
}
.card-value {
  font-size: 18px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  color: #2d2f38;
  padding: 20px;
}
.card-title {
  color: #949ea1;
  font-weight: 500;
  font-size: 14px;
  font-style: italic;
  margin-top: 0.4%;
}
.card-icon {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-status {
  font-weight: 500;
  font-size: 14px;
  padding: 1%;
}
.el-avatar--icon {
  color: black !important;
  font-size: 1.25rem;
}
@media (max-width: 600px) {
  body {
    height: auto;
  }
}
@media (max-width: 250px) {
  .card {
    width: 90%;
  }
}
.status {
  position: relative;
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin: 10px;
}
.status.online, .status.online:before {
  background: #72ff7d;
}
.status.offline, .status.offline:before {
  background: #ff4242;
}
.status.invisible, .status.invisible:before {
  background: #42e5ff;
}
.status.idle, .status.idle:before {
  background: #ffda72;
}
.status:before {
  content: "";
  display: block;
  position: absolute;
  left: -5px;
  top: -5px;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  animation: pulse 1.5s infinite ease-in;
}

@keyframes pulse {
  from {
    transform: scale(0.5);
    opacity: 1;
  }
  to {
    transform: scale(1.5);
    opacity: 0;
  }
}


</style>