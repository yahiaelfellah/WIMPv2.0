<template>
     <div id="profile">
    <div class="common-layout">
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <MemberStatus/>
      </el-main>
      <el-footer>
        <h3>&copy; 2022 wimp</h3>
      </el-footer>
    </div>
  </div> 
</template>
<script>
import Header from '../components/Common/HeaderComponent.vue';
import MemberStatus from '@/components/Member/MemberStatus.vue';
export default {
    name:"vue-member",
    components:{
        Header,
        MemberStatus,
    }
}
</script>
<style>

</style>