<template>
  <el-row :gutter="24">
    <el-col :span="8">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <!-- <el-button
              color="#7325ef"
              plain
              round
              ><el-icon><Plus /></el-icon> Add
            </el-button> -->
            <span class="card-title"> Default Messages</span>
          </div>
        </template>
        <div
          id="default-messages"
          style="display: flex; flex-direction: column; align-items: stretch"
        >
          <div class="input-default">
            <div class="default-message">
              <p>Available default:</p>
              <input
                type="text"
                v-model="message.available"
                maxlength="25"
                style="background-color: #2ecc7166"
              />
            </div>
          </div>

          <div class="input-default">
            <div class="default-message">
              <p>Busy default:</p>
              <input
                type="text"
                v-model="message.busy"
                maxlength="25"
                style="background-color: #f1c40f66"
              />
            </div>
          </div>

          <div class="input-default">
            <div class="default-message">
              <p>Unavailable default:</p>
              <input
                type="text"
                v-model="message.unavailable"
                maxlength="25"
                style="background-color: #e74c3c66"
              />
            </div>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="16">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <!-- <el-button color="#7325ef" plain round
              ><el-icon><Plus /></el-icon> Add
            </el-button> -->
            <span class="card-title">
              Click on Add to create a custom message in order to be displayed
              for the users</span
            >
            <!-- <DeviceForm
              :visible="dialogFormVisible"
              @close="dialogFormVisible = false"
              @refresh="getData()"
            /> -->
          </div>
        </template>
        <el-scrollbar height="50vh">
          <el-skeleton :loading="false" animated :count="3" :throttle="500">
            <template #template>
              <div id="skeleton-item" style="width: 100%; height: 200px">
                <div style="padding: 14px">
                  <el-skeleton-item variant="h3" style="width: 50%" />
                  <div>
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
              <div style="margin: 1%" v-for="item in 3" :key="item">
                <StatusElement />
              </div>
            </template>
          </el-skeleton>
        </el-scrollbar>
      </el-card>
    </el-col>
  </el-row>
  <!-- 
    <h2>Your states :</h2>

    <button class="pntr" id="add-state" style="margin-top: 0px">+ State</button>
    <div id="default-messages" class="default-messages">
      <h1 style="margin: 100px 0 30px 20px">Default messages :</h1>
      <div class="input-default">
        <div id="default-message-available" class="default-message">
          <p>Available default message :</p>
          <input type="text" value="{{default.available}}" maxlength="25" />
        </div>
        <p class="status green">{{ msg }}</p>
      </div>

      <div class="input-default">
        <div id="default-message-busy" class="default-message">
          <p>Busy default message :</p>
          <input type="text" value="{{default.busy}}" maxlength="25" />
        </div>
        <p class="status orange">{{ msg }}</p>
      </div>

      <div class="input-default">
        <div id="default-message-unavailable" class="default-message">
          <p>Unavailable default message :</p>
          <input type="text" value="{{default.unavailable}}" maxlength="25" />
        </div>
        <p class="status red">{{ msg }}</p>
      </div>
    </div>

    <div class="states-control">
      <button class="pntr" id="save-states">Save</button>
      <button class="pntr" id="tracker" value="{{tracking}}">
        Tracker {{ tracking }}
      </button>
      <button class="pntr" id="my-flow">My flow</button>
    </div> -->
</template>
<script>
import StatusElement from "./MemberStatusElement.vue";
export default {
  props: {
    states: {
      type: Array,
    },
  },
  components: {
    StatusElement,
  },
  data() {
    return {
      message: {
        available: "",
        busy: "",
        unavailable: "",
      },
    };
  },
};
</script>
<style>
.skeleton-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
}

.default-message {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: var(--shadow);
  background-color: var(--bg);
  padding: var(--el-card-padding);
  border-radius: 100px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  float: left;
  /* width: 450px; */
}

.default-message > * {
  padding: 0;
}

.default-message > p {
  margin-right: 10px;
  float: right;
  font-size: smaller;
  /* width: 200px; */
}

.default-message > input {
  font-size: var(--small-text);
  padding: 1%;
  border-radius: 100px;
  width: 100%;
}

.default-message:hover {
  border: 1px solid var(--main);
}

.input-default {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.input-default > p {
  font-size: var(--small-text);
  margin-left: auto;
}

/* .tracker-on {
  border-color: var(--green);
  color: var(--green);
}

.tracker-on:hover {
  border-color: var(--red);
  color: var(--bg);
  background-color: var(--red);
}

.tracker-off {
  border-color: var(--red);
  color: var(--red);
}

.tracker-off:hover {
  border-color: var(--green);
  color: var(--bg);
  background-color: var(--green);
}

#my-flow {
  width: 150px;
}

.delete-btn {
  margin-right: 20px;
  color: var(--grey);
}

.delete-btn:hover {
  cursor: pointer;
  color: var(--main);
} */
</style>