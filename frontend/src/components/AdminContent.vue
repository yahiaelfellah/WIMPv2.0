<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <el-card>
        <template #header>
          <div class="card-header">
            <p style="font-weight: bold">
              <el-icon><User /></el-icon> Users
            </p>
            <el-button type="success" round>New User</el-button>
          </div>
        </template>
        <el-table :data="filterTableData" style="width: 100%" max-height="250">
          <el-table-column label="First name" prop="firstName" />

          <el-table-column label="Last name" prop="lastName" />
          <el-table-column label="Permisssion" prop="permissionLevel">
            <template #default="scope">
              <el-tag class="ml-2" type="danger">{{
                userRole(scope.row.permissionLevel)
              }}</el-tag>
            </template>
          </el-table-column>
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
            <p style="font-weight: bold"><el-icon><Cellphone /></el-icon> Devices</p>
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
  <el-row :gutter="20">
    <el-col v-if="activateFitbit" :span="8">
      <Map />
    </el-col>
    <el-col  :span="8">
      
    </el-col>
    <el-col v-if="activateFitbit" :span="8">
    </el-col>
  </el-row>
</template>

<script>
import { User,Cellphone } from "@element-plus/icons-vue";
import Map from "./MapboxComponent.vue"
import { Role } from "../helpers/roles";
export default {
  data() {
    return {
      search: "",
      activateFitbit: false,
      activateSmartPlug: false,
    };
  },
  components: {
    User,
    Cellphone,
    Map
  },
  props: {
    cols: {
      type: Array,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    filterTableData() {
      console.log(this.cols);
      return this.tableData;
      //   return this.tableData.filter((data) => {
      //     !this.search ||
      //       data.name.toLowerCase().includes(this.search.toLowerCase());
      //   });
    },
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    userRole(role) {
      return Object.keys(Role).find((key) => Role[key] === role);
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
</style>
