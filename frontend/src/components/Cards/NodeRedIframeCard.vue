<template>
    <el-card class="box-card">
        <!-- <vue-friendly-iframe :src="src"></vue-friendly-iframe> -->
        <iframe :src="src" id="nodered-container"></iframe>
  </el-card>     
         
</template>
<script>
export default {
    name:"nodered-iframe",
    // props:{
    //     src: {
    //         type:String ,
    //          default:'http://127.0.0.1:8000/red/#flow/',
    //          required: true
    //     }
    // },
    data(){
        return {
            src:'http://127.0.0.1:8000/red/#flow/'
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