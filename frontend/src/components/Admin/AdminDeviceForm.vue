<template>
  <!-- <el-button @click="dialogFormVisible = true" round
    ><el-icon><Plus /></el-icon> Add
  </el-button> -->

  <el-drawer
    ref="drawerRef"
    v-model="dialogFormVisible"
    :width="720"
    :before-close="handleCancelOrClose"
    :body-style="{ paddingBottom: '80px' }"
    direction="rtl"
    class="demo-drawer"
  >
    <div class="drawer-content">
      <el-row :gutter="24" class="title">
        <h2>New Entry</h2>
      </el-row>
      <el-row :gutter="24" class="title">
        <p style="font-style: italic">Add the new user to the system</p>
      </el-row>
      <el-form
        ref="ruleForm"
        :model="form"
        :rules="rules"
        status-icon
        label-width="120px"
      >
        <el-form-item label="First name" prop="firstName" required>
          <el-col :span="12">
            <el-input
              v-model="form.firstName"
              autocomplete="off"
              placeholder="Please input"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="Last name" prop="lastName" required>
          <el-col :span="12">
            <el-input
              v-model="form.lastName"
              autocomplete="off"
              placeholder="Please input"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="User email " prop="email" required>
          <el-col :span="12">
            <el-input
              v-model="form.email"
              autocomplete="off"
              placeholder="Please input"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="Password" prop="password" required>
          <el-col :span="12">
            <el-input
              v-model="form.password"
              autocomplete="off"
              placeholder="Auto generated password"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="Activity time" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                v-model="form.date1"
                type="date"
                label="Pick a date"
                placeholder="Pick a date"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col class="text-center" :span="2">
            <span class="text-gray-500">-</span>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                v-model="form.date2"
                label="Pick a time"
                placeholder="Pick a time"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="Permission Level" prop="permissionLevel">
          <el-col :span="12">
            <el-select v-model="form.permissionLevel">
              <el-option
                v-for="item in permission"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                allow-create
                default-first-option
                :reserve-keyword="false"
                placeholder="Choose permission level"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancelOrClose()">Cancel</el-button>
        <el-button type="primary" @click="submitForm()"> Confirm </el-button>
      </span>
    </template>
  </el-drawer>
  <!-- <el-dialog v-model="dialogFormVisible">

  </el-dialog> -->
</template>
<script >
import { userService } from "../../services/user.service";
import { ElLoading, ElMessage } from "element-plus";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        birthday: "",
        date2: "",
        permissionLevel: null,
      },
      dialogFormVisible: false,
      wrapper: document.body,
      permission: [
        {
          value: 1,
          label: "Surfer",
        },
        {
          value: 32768,
          label: "Member",
        },
        {
          value: 1073741824,
          label: "Master",
        },
      ],
      rules: {
        firstName: [
          {
            required: true,
            message: "Please input user first name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 20,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
        lastName: [
          {
            required: true,
            message: "Please input user last name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 20,
            message: "Length should be 3 to 20",
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: "Please input email address",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  components: {},
  watch: {
    "form.firstName": {
      handler: function () {
        this.form.password = Math.random().toString(36).slice(2).toString();
      },
      immediate: true,
    },
    visible: {
      handler: function (o, n) {
        this.dialogFormVisible = n;
        console.log(o);
        console.log(n);
      },
    },
  },
  computed: {},
  methods: {
    resetForm() {
      this.$refs["ruleForm"].resetFields();
      console.log(this.$refs["ruleForm"]);
    },
    handleCancelOrClose() {
      this.resetForm();
      this.$emit("onClose");
    },
    submitForm() {
      this.loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          userService
            .create(this.form)
            .then(() => {
              this.loading.close();
              this.handleCancelOrClose();
              ElMessage({
                message: "New user created",
                type: "success",
                showClose: true,
              });
              this.$emit("refresh");
            })
            .catch((error) => {
              this.loading.close();
              this.message =
                (error.response && error.response.data) || error.message;
              ElMessage({
                message: this.message,
                type: "error",
                showClose: true,
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style>
.title {
  margin: 5%;
  display: flex;
  justify-content: center;
}
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>