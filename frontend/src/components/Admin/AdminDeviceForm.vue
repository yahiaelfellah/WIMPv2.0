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
        <p>Add a new device to the system</p>
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
        <el-form-item label="Device Name" prop="name" required>
          <el-col :span="12">
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="Please input"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="Display Name" prop="displayName" required>
          <el-col :span="12">
            <el-input
              v-model="form.displayName"
              autocomplete="off"
              placeholder="Please input"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="Type" prop="type" required>
          <el-col :span="12">
            <el-input
              v-model="form.type"
              autocomplete="off"
              placeholder="Please input"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="Version " prop="version" required>
          <el-col :span="12">
            <el-input
              v-model="form.version"
              autocomplete="off"
              placeholder="Please input"
            />
          </el-col>
        </el-form-item>
        <el-space fill>
          <el-alert type="info" show-icon :closable="false">
            <p>
              "From Template" value specifies to clone a flow template or not.
            </p>
          </el-alert>
          <el-form-item label="From Template" prop="fromTemplate">
            <el-switch v-model="form.fromTemplate" />
          </el-form-item>
        </el-space>
        <el-form-item v-if="form.fromTemplate" label="Flow Template" prop="flowId">
          <el-select v-model="form.flowId" placeholder="Activity zone">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-space fill>
          <el-alert type="info" show-icon :closable="false">
            <p>
              "Description" value has the specific instructions for device in
              order to follow.
            </p>
          </el-alert>
          <el-form-item label="Description" prop="Description">
            <el-col :span="12">
              <el-input v-model="form.description" type="textarea" />
            </el-col>
          </el-form-item>
        </el-space>
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
import { deviceService } from "../../services/device.service";
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
        name: "",
        displayName: "",
        version: "",
        description: "",
        type: "",
        fromTemplate: false,
        flowId : null,
      },
      isVisible: false,
      wrapper: document.body,
      rules: {
        name: [
          {
            required: true,
            message: "Please input device name",
            trigger: "blur",
          },
        ],
        displayName: [
          {
            required: true,
            message: "Please input device display name",
            trigger: "blur",
          },
        ],
        version: [
          {
            required: true,
            message: "Please input version",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {},
  watch: {
    visible: function (n, o) {
      this.isVisible = n;
      console.log("Prop changed: ", n, " | was: ", o);
    },
  },
  methods: {
    resetForm() {
      this.$refs["ruleForm"].resetFields();
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
          deviceService
            .create(this.form)
            .then(() => {
              this.loading.close();
              this.handleCancelOrClose();
              ElMessage({
                message: "New device created",
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
          this.loading.close();
          return false;
        }
      });
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
.el-space {
  display: flex;
  vertical-align: top;
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