<template>
  <div id="header">
    <div id="logo">
      <img class="logo" :src="require('../../assets/logo.svg')" />
      <h1 v-if='isdefault' >WIMP</h1>

    </div>
    <el-button
      class="pntr"
      @click="handleLogout"
      color="#7325ef"
      size="large"
      plain
      round
      >Logout</el-button
    >
    <!-- <el-button id="logout-btn" class="pntr" @click="handleLogout"
      >Logout</el-button
    > -->
  </div>
</template>
<script>
import { AuthenticationService } from "../../services/auth.service";

export default {
    props: { 
        isdefault : {
            type: Boolean,
            default : true
        }
    },
  methods: {
    handleLogout() {
      AuthenticationService.logout();
      this.$router.push("/login");
    },
  },
};
</script>
<style>
#logo {
  display: flex;
  align-items: center;
}
#logo img.logo {
  height: 50px;
  margin-right: 10px;
}
#logo .pntr:hover {
  cursor: pointer;
}
#header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right:80px;
  margin-left: 80px;
  margin-bottom: 20px;
  justify-content: space-between;
}


</style>