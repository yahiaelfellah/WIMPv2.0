<template>
  <div>
    <transition name="el-fade-in-linear">
      <el-divider
        v-show="show"
        content-position="left"
        style="font-weight: bold"
      >
        <el-icon><User /></el-icon> User Management</el-divider
      >
    </transition>

    <el-row :gutter="20">
      <el-col :span="18">
        <transition name="el-fade-in-linear">
          <el-card v-show="show">
            <template #header>
              <div class="card-header">
                <!-- <el-button type="success" round>New User</el-button> -->
                <el-button
                  color="#7325ef"
                  plain
                  round
                  @click="() => (dialogFormVisible = true)"
                  ><el-icon><Plus /></el-icon> Add
                </el-button>
                <span class="card-title"> Click on user for more infos</span>

                <!-- <span class="card-title">
                Click on device card for more infos</span
              > -->
                <UserForm
                  :visible="dialogFormVisible"
                  @close="dialogFormVisible = false"
                  @refresh="getData()"
                />
              </div>
            </template>
            <el-table
              :data="tableData"
              style="width: 100%"
              max-height="250"
              highlight-current-row
              @current-change="handleCurrentChange"
            >
              <el-table-column label="First name" prop="firstName"  style="min-width:300px"/>

              <el-table-column label="Last name" prop="lastName" style="min-width:300px" />
              <el-table-column label="Email" prop="email" style="min-width:300px" />

              <el-table-column label="Permisssion" prop="permissionLevel" style="min-width:300px">
                <template #default="scope">
                  <el-tag class="ml-2" type="danger">{{
                    userRole(scope.row.permissionLevel)
                  }}</el-tag>
                </template>
              </el-table-column>

              <template #header>
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="Type to search"
                />
              </template>
              <el-table-column label="Operations" fixed="right" width="200">
                <template #default="scope">
                  <el-button
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)"
                    >Edit</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >Delete</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </transition>
      </el-col>
      <el-col :span="6">
        <el-card>
          <el-skeleton style="width: 240px" :loading="true" animated>

          <template #template>
        <!-- <el-skeleton-item variant="image" style="width: 240px; height: 240px" /> -->
        <el-skeleton-item variant="circle" />

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
        <el-card :body-style="{ padding: '0px', marginBottom: '1px' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          />
          <div style="padding: 14px">
            <span>Delicious hamburger</span>
            <div class="bottom card-header">
              <div class="time">{{ currentDate }}</div>
              <el-button text class="button">Operation button</el-button>
            </div>
          </div>
        </el-card>
      </template>
    </el-skeleton>

        <!-- <template #header>
          <div class="card-header">
            <p style="font-weight: bold">
              <el-icon><Cellphone /></el-icon> Devices
            </p>
            <el-button type="success" round>New Device</el-button>
          </div>
        </template>
        <el-row
          style="
            disply: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <p>Fitbit</p>
          <el-switch
            v-model="activateFitbit"
            active-text="Enable"
            inactive-text="Disable"
          />
        </el-row>
        <el-row
          style="
            disply: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <p>Smart Plug</p>
          <el-switch
            v-model="activateSmartPlug"
            active-text="Enable"
            inactive-text="Disable"
          />
        </el-row> -->
      </el-card>
      </el-col>
    </el-row>

    <transition name="el-fade-in-linear"> 
      <el-divider
        v-show="show"
        content-position="left"
        style="font-weight: bold"
      >
        <el-icon><Cellphone /></el-icon> Flow Management</el-divider
      >
    </transition>
    <transition name="el-fade-in-linear">
      <FlowManager />
    </transition>
    <transition name="el-fade-in-linear">
      <el-divider
        v-show="show"
        content-position="left"
        style="font-weight: bold"
      >
        <el-icon><Cellphone /></el-icon> Device Management</el-divider
      >
    </transition>
    <transition name="el-fade-in-linear">
      <div v-show="show">
        <DeviceManager />
      </div>
    </transition>
  </div>

  <!-- <el-row :gutter="20">
    <el-col v-if="activateFitbit" :span="8">
      <Map />
    </el-col>
    <el-col :span="8"> </el-col>
    <el-col v-if="activateFitbit" :span="8"> </el-col>
  </el-row> -->
</template>

<script>
import { User, Cellphone, Plus } from "@element-plus/icons-vue";
import { userService } from "../../services/user.service";
// import { deviceService } from "../../services/device.service";
import { ElMessage } from "element-plus";
import UserForm from "./AdminUserForms.vue";
import DeviceManager from "./AdminDeviceManager.vue";
import FlowManager from "./AdminFlowManager.vue";
// import Map from "../MapboxComponent.vue";
import { Role } from "../../helpers/roles";
export default {
  data() {
    return {
      search: "",
      activateFitbit: false,
      activateSmartPlug: false,
      tableData: [],
      dialogFormVisible: false,
      show: false,
    };
  },
  components: {
    User,
    Cellphone,
    Plus,
    UserForm,
    DeviceManager,
    FlowManager
  },

  mounted() {
    this.getData();
    setTimeout(() => {
      this.show = !this.show;
    }, 300);
    // userService.getAll().then((response) => {
    //         this.allUsers = response.data
    //       })
  },
  computed: {
    cols() {
      return this.tableData && this.tableData.length !== 0
        ? Object.keys(this.tableData[0])
        : [];
    },
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      userService
        .deleteUser(row._id)
        .then(() => {
          ElMessage({
            message: `user with ID = ${row._id} has been deleted`,
            type: "success",
            showClose: true,
          });
          this.getData();
        })
        .catch((error) => {
          this.message =
            (error.response && error.response.data) || error.message;
          ElMessage({
            message: this.message,
            type: "error",
            showClose: true,
          });
        });
      //console.log(index, row);
    },

    userRole(role) {
      return Object.keys(Role).find((key) => Role[key] === role);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      console.log(this.currentRow);
    },
    getData() {
      userService.getAll().then((response) => {
        this.tableData = response.data;
      });
    },
  },
};
</script>
<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-divider__text {
  background-color: #f5f5f5 !important;
}
</style>
