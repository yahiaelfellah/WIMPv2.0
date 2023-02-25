<template>
  <el-row :gutter="20">
    <el-col :span="8"> 
        <el-card></el-card>
    
    </el-col>
    <el-col :span="16">
      <el-card>
        <iframe
          src="http://127.0.0.1:8000/red/#flow"
          class="myIfr"
          frameborder="0"
        ></iframe>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {};
</script>



