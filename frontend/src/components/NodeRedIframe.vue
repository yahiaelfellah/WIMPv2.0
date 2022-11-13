<template>
    <el-card class="box-card">
          <iframe src="http://127.0.0.1:1880/#flow/f0e112650fd4fdc6" id="nodered-container"></iframe>
  </el-card>     
         
</template>
<script>
export default {
    name:"nodered-iframe",
    props:{
        src: {
            type:String ,
             default:'http://127.0.0.1:1880/#flow/f0e112650fd4fdc6',
             required: true
        }
    }
}
</script>
<style scoped>
#nodered-container {
    width: 100%;
    height: 500px;    
    border: 0px;
    border-radius: 3px;
}
</style>