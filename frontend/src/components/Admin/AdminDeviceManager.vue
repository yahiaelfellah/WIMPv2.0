<template>
  <el-row :gutter="24">
    <el-col :span="24">
      <el-card class="box-card container">
        <template #header>
          <div class="card-header">
            <span>Devices</span>
          </div>
        </template>
        <el-scrollbar v-if="!isEmpty">
          <el-skeleton
            :loading="loading"
            animated
            :count="3"
          >
            <template #template>
              <el-skeleton-item
                variant="image"
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
                  <el-skeleton-item variant="text" style="margin-right: 16px" />
                  <el-skeleton-item variant="text" style="width: 30%" />
                </div>
              </div>
            </template>
            <template #default>
              <div class="scrollbar-flex-content">
                <el-col :span="4" v-for="item in devices" :key="item">
                  <el-card class="box-card">
                    <el-avatar :icon="watch" color="#E5F3FE">
                      <el-icon color="#409EFC" class="no-inherit" :size="50"
                        ><Watch v-if="isWatch(item.type)"
                      /></el-icon>
                    </el-avatar>
                    <div class="card-value">{{ item.name }}</div>
                    <div class="card-title">{{ item.type }}</div>
                    <div class="card-status">
                      <el-button type="primary" plain>Show flow</el-button>
                    </div>
                  </el-card>
                </el-col>
              </div>
            </template>
          </el-skeleton>
        </el-scrollbar>
        <el-empty v-if="isEmpty"> </el-empty>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { deviceService } from "../../services/device.service";
import { Watch } from "@element-plus/icons-vue";

export default {
  components: {
    Watch,
  },
  computed: {
    isEmpty() {
      return this.devices.length === 0;
    },
  },
  methods: {
    getData() {
      deviceService.getAll().then((res) => {
        this.devices = res.data;
        setTimeout(() => { 
        this.loading = false;

        },1000)
      });
    },
    isWatch(type) {
      return type === "watch";
    },
  },

  mounted() {
    this.getData();
  },
  data() {
    return {
      devices: [],
      watch: Watch,
      loading : true
    };
  },
};
</script>
<style>
.container {
  min-height: 32vh;
  max-height: 32vh;
}
.el-card__header {
  padding: calc(var(--el-card-padding) - 2px) var(--el-card-padding);
  /* border-bottom: 1px solid var(--el-card-border-color); */
  box-sizing: border-box;
}
.scrollbar-flex-content {
  display: flex;
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
  margin-bottom: 10px;
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
</style>