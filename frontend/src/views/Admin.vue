<template>
  <div id="profile">
    <header>
      <img class="logo" :src="require('../assets/logo.svg')" />
      <h1>WIMP</h1>
      <button id="logout-btn" class="pntr" @click="handleLogout">Logout</button>
    </header>
    <!-- <IFrame /> -->
    <section id="main">
      <article>
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          size="large"
        />
        <h1>{{ name }}</h1>
        <h3>{{ id }}</h3>
      </article>
      <el-tabs tab-position="right" style="height: 100%" class="demo-tabs" :stretch="true">
        <el-tab-pane label="States"><AdminContent /></el-tab-pane>
        <el-tab-pane label="Config">Config</el-tab-pane>
        <el-tab-pane label="Role">Role</el-tab-pane>
        <el-tab-pane label="Task">Task</el-tab-pane>
      </el-tabs>
    </section>
    <footer class="fixed-footer">
      <h3>&copy; 2022 wimp</h3>
    </footer>
  </div>
</template>
<script>
// import IFrame from "@/components/NodeRedIframe.vue"
import AdminContent from "@/components/AdminStatus.vue";
export default {
  name: "vue-admin",
  components: {
    // IFrame,
    AdminContent,
  },
  data: () => ({
    myIframe: null,
  }),
  methods: {
    onLoad(frame) {
      this.myIframe = frame.contentWindow;
    },
        handleLogout(){
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
};
</script>
<style scoped>
:root {
  --el-color-primary: #7325ef;
}

.el-tabs--right .el-tabs__header.is-right {
    margin-right: 3%;
      height: 100%;

}
#profile article {
  display: flex;
  flex-flow: column;
  align-items: center;
}
#profile article img {
  border-radius: 100px;
  height: 120px;
  width: 120px;
  margin-bottom: 20px;
}

#profile main {
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
}

.state {
  width: 800px;
  display: flex;
  flex-flow: row;
  align-items: center;
  padding: 60px 0;
  border-bottom: 2px solid rgb(230, 230, 230);
}
.state:last-child {
  border-bottom: 2px solid transparent;
  padding: 60px 0 30px 0;
}

.cont {
  display: flex;
  flex-flow: row;
  align-items: center;
}
.state h1 {
  margin-right: 20px;
}

/* #profile section{
    display: flex;
    flex-flow: column;
    align-items: center;
} */

.state div.input {
  display: flex;
  flex-flow: row;
  align-items: center;
  margin: auto 10px;
  box-shadow: var(--shadow);
  background-color: var(--bg);
  padding: 12px 20px;
  border-radius: 100px;
  border: 1px solid transparent;
}

.crop {
  width: 200px !important;
  margin-left: auto;
  overflow-wrap: break-word;
  padding: 7px 20px !important;
  font-size: var(--small-text) !important;
}
.state input {
  padding: 0;
  font-size: var(--small-text);
}

.state div.input:hover {
  border: 1px solid var(--main);
}

.state p {
  font-size: var(--small-text);
  margin-right: 10px;
}

.state select {
  border: none;
  border-radius: 10%;
}

#profile button:disabled {
  color: grey;
  border-color: grey;
}

#profile button:disabled:hover {
  background-color: transparent;
  cursor: not-allowed;
}

#profile header button {
  margin-top: 0px;
  margin-left: auto;
}

.states-control {
  width: 800px;
  margin: 100px auto 40px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.states-control > * {
  margin: 0 25px;
}

.states-control button {
  width: 150px;
  margin: 0 auto;
}

.arrow-size {
  font-size: medium;
}

.ajs-ok {
  color: var(--main) !important;
}

.visibility {
  margin-top: 20px !important;
}
.visibility > p {
  margin-right: auto;
}
.visibility input {
  margin-right: 30px;
}

.visibility label {
  margin-right: 10px;
  font-size: var(--small-text);
}

.default-messages {
  width: 800px;
}

.default-message {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: var(--shadow);
  background-color: var(--bg);
  padding: 12px 20px;
  border-radius: 100px;
  font-size: var(--small-text);
  margin-bottom: 20px;
  border: 1px solid transparent;
  float: left;
  width: 450px;
}

.default-message > * {
  padding: 0;
}

.default-message > p {
  margin-right: 10px;
  float: right;
  width: 200px;
}

.default-message > input {
  font-size: var(--small-text);
}

.default-message:hover {
  border: 1px solid var(--main);
}

.input-default {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.input-default > p {
  font-size: var(--small-text);
  margin-left: auto;
}

.tracker-on {
  border-color: var(--green);
  color: var(--green);
}

.tracker-on:hover {
  border-color: var(--red);
  color: var(--bg);
  background-color: var(--red);
}

.tracker-off {
  border-color: var(--red);
  color: var(--red);
}

.tracker-off:hover {
  border-color: var(--green);
  color: var(--bg);
  background-color: var(--green);
}

#my-flow {
  width: 150px;
}

.delete-btn {
  margin-right: 20px;
  color: var(--grey);
}

.delete-btn:hover {
  cursor: pointer;
  color: var(--main);
}
</style>