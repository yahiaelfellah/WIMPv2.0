<template>
  <el-divider content-position="left" style="font-weight: bold">
    <el-icon><User /></el-icon> User Management</el-divider
  >

  <el-row :gutter="20">
    <el-col :span="16">
      <el-card>
        <template #header>
          <div class="card-header">
            <!-- <el-button type="success" round>New User</el-button> -->
            <UserForm @refresh="getData()" />
          </div>
        </template>
        <el-table
          :data="tableData"
          style="width: 100%"
          max-height="250"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column label="First name" prop="firstName" />

          <el-table-column label="Last name" prop="lastName" />
          <el-table-column label="Email" prop="email" />

          <el-table-column label="Permisssion" prop="permissionLevel">
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
          <el-table-column label="Operations">
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
    </el-col>
    <el-col :span="8">
      <el-card>
        <template #header>
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
        </el-row>
      </el-card>
    </el-col>
  </el-row>
  <el-divider content-position="left" style="font-weight: bold">
    <el-icon><Cellphone /></el-icon> Device Management</el-divider
  >
 <DeviceManager />
  <!-- <el-row :gutter="20">
    <el-col v-if="activateFitbit" :span="8">
      <Map />
    </el-col>
    <el-col :span="8"> </el-col>
    <el-col v-if="activateFitbit" :span="8"> </el-col>
  </el-row> -->
</template>

<script>
import { User, Cellphone } from "@element-plus/icons-vue";
import { userService } from "../../services/user.service";
// import { deviceService } from "../../services/device.service";
import { ElMessage } from 'element-plus';
import UserForm from "./AdminUserForms.vue";
import DeviceManager from "./AdminDeviceManager.vue";
// import Map from "../MapboxComponent.vue";
import { Role } from "../../helpers/roles";
export default {
  data() {
    return {
      search: "",
      activateFitbit: false,
      activateSmartPlug: false,
      tableData : [], 
    };
  },
  components: {
    User,
    Cellphone,
    UserForm,
    DeviceManager
  },

  mounted() {

  this.getData()
// userService.getAll().then((response) => {
//         this.allUsers = response.data
//       })
},
  computed: {

    cols() {
      return this.tableData && this.tableData.length !== 0 ? Object.keys(this.tableData[0]) : [];
    },
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index,row) {
      userService.deleteUser(row._id).then(() => {
        ElMessage({
                message: `user with ID = ${row._id} has been deleted`,
                type: "success",
                showClose: true

              });
        this.getData();
      }).catch(error => { 
         this.message =
                (error.response && error.response.data) || error.message;
              ElMessage({
                message: this.message,
                type: "error",
                showClose: true
              });

      });
      //console.log(index, row);
    },

    userRole(role) {
      return Object.keys(Role).find((key) => Role[key] === role);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    getData(){
        userService.getAll().then((response) => {
          this.tableData = response.data
      })
    },
  },
};
</script>
<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
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
