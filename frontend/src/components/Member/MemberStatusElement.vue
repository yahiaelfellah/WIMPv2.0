<template>
  <el-card class="box-card" shadow="hover">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      label-width="120px"
      label-position="left"
    >
      <el-form-item label="Message">
        <el-col :span="16">
          <el-form-item prop="message">
            <el-input
              v-model="ruleForm.message"
              placeholder="Please add a message"
            />
          </el-form-item>
        </el-col>
        <el-col class="text-center" :span="2">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="color">
            <el-select v-model="ruleForm.color" placeholder="Color">
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <div
                  style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                  "
                >
                  <span style="float: left">{{ item.label }}</span>
                  <span
                    class="square"
                    :style="{
                      float: 'right',
                      'background-color': item.value,
                      'font-size': '13px',
                    }"
                  ></span>
                </div>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Visibility:" prop="visibility">
        <el-checkbox-group v-model="ruleForm.visibility">
          <el-checkbox label="Student" name="type" />
          <el-checkbox label="Researcher" name="type" />
          <el-checkbox label="Colleague" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <!-- <p id="preview-{{id}}" class="status {{color}}">{{ ruleForm.message }}</p> -->
        <p :style="{ 'background-color': ruleForm.color }">
          {{ ruleForm.message }}
        </p>
        <el-button
          type="danger"
          :icon="Delete"
          plain
          circle
          style="margin-left: auto"
        />
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { Delete } from "@element-plus/icons-vue";
export default {
  // components : {
  //   Delete,
  // },
  prop: {
    id: {
      type: String,
    },
    ruleForm: {
      type: Object,
      default: {
        color: "",
        visibility: [],
        message: "",
      },
    },
  },
  data() {
    return {
      type: "",
      Delete,
      ruleForm: {},
      cities: [
        {
          label: "Green",
          value: "#2ecc7166",
        },
        {
          label: "Yellow",
          value: "#f1c40f66",
        },
        {
          label: "Red",
          value: "#e74c3c66",
        },
      ],
    };
  },
};
</script>
<style scoped>
.box-card > .el-card__body {
  padding-bottom: 0px !important;
}
.el-form-item {
  margin-bottom: 9px;
}
.square {
  height: 12px;
  width: 12px;
  border-radius: 30%;
}
</style>
