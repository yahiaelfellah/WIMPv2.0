<template>
  <!-- <el-button @click="dialogFormVisible = true" round
    ><el-icon><Plus /></el-icon> Add
  </el-button> -->

  <el-drawer
    ref="drawerRef"
    v-model="isVisible"
    size="35%"
    :before-close="handleCancelOrClose"
    :body-style="{ paddingBottom: '80px' }"
    direction="rtl"
    class="demo-drawer"
  >
    <div class="drawer-content">
      <el-row :gutter="24" id="title">
        <h2>New Entry</h2>
      </el-row>
      <el-row :gutter="24" id="title" class="card-title">
        <p>Add a new user to the system</p>
      </el-row>
      <el-form
        ref="ruleForm"
        :model="form"
        :rules="rules"
        status-icon
        label-width="150px"
        label-position="left"
        style="max-width: 700px; margin: 7%"
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
        <el-space fill>
          <el-alert type="info" show-icon :closable="false">
            <p>
              "Password" value is automatically generated and attached to the
              input:
            </p>
          </el-alert>
          <el-form-item label="Password" prop="password" required>
            <el-col :span="12">
              <el-input
                v-model="form.password"
                autocomplete="off"
                placeholder="Auto generated password"
              />
            </el-col>
          </el-form-item>
        </el-space>

        <el-form-item label="User type" prop="type" required>
          <el-col :span="12">
            <el-radio-group v-model="form.type">
              <el-radio label="Teacher" />
              <el-radio label="Student" />
            </el-radio-group>
          </el-col>
        </el-form-item>
        <el-form-item label="Birthday" required>
          <el-col :span="12">
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
        </el-form-item>
        <el-space fill>
          <el-alert type="info" show-icon :closable="false">
            <p
              style="text-align: initial;"
            >
              You must specify 'Departement' label on the individal inputs.<br>The
              label will be created in the system so will be shown in the
              dropdown.
            </p>
          </el-alert>
          <el-form-item label="Departement" prop="departement">
            <el-col :span="12">
              <el-select-v2
                v-model="form.departement"
                :options="departementOptions"
                placeholder="Please select"
                style="width: 100%"
                :remote-method="getDapartement"
                allow-create
                filterable
                clearable
              />
            </el-col>
          </el-form-item>
        </el-space>

        <el-form-item label="Permission Level" prop="permissionLevel">
          <el-col :span="12">
            <el-select v-model="form.permissionLevel">
              <el-option
                v-for="item in permissionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :reserve-keyword="false"
                style="width: 100%"
                placeholder="Choose permission level"
                allow-create
                default-first-option
              >
              </el-option>
            </el-select>

            <!-- <el-select v-model="form.permissionLevel">
              <el-option
                v-for="item in permissionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                allow-create
                default-first-option
                :reserve-keyword="false"
                placeholder="Choose permission level"
              >
              </el-option>
            </el-select> -->
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
import { departementService } from "../../services/departement.service";
import { ElLoading, ElMessage } from "element-plus";

export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
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
        type: "Teacher",
        departement: null,
      },
      isVisible: false,
      wrapper: document.body,
      permissionOptions: [],
      departementOptions: [],
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
    visible: function (n, o) {
      this.isVisible = n;
      console.log("Prop changed: ", n, " | was: ", o);
    },
    "form.type": {
      handler: function () {
        this.permissionOptions = this.changePermissions();
        console.log(this.permissionOptions);
      },
      immediate: true,
    },
  },
  computed: {},
  methods: {
    resetForm() {
      this.$refs["ruleForm"].resetFields();
    },
    changePermissions() {
      return this.form.type === "Teacher" || this.form.type === null
        ? this.permission
        : [this.permission[0]];
    },
    handleCancelOrClose() {
      this.resetForm();
      this.isVisible = false;
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
          return false;
        }
      });
    },
    getDapartement() {
      this.departementOptions = departementService.getAll();
    },
  },
};
</script>
<style>
#title {
  margin: 5%;
  display: flex;
  justify-content: center;
  font-size: 14px;
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
.el-select-v2__placeholder {
  display: flex;
}
</style>