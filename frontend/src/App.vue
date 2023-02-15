<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <router-view></router-view>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
//import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default {
  name: "App",
  // components: {
  //   HelloWorld
  // }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
:root {
  --el-color-primary: #7325ef;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  --green: #00c159;
  --main: #7325ef;
  --red: #ee463c;
  --orange: #eeab00;
  --bg: #ffffff;
  --shadow: 0 2px 5px #00000034;
  --grey: #808080;
  --greenT: #00c15915;
  --redT: #ee463c15;
  --orangeT: #f8bc2220;
  --small-text: 14px;
  font-family: "Open Sans", sans-serif;
}

body {
  margin-top: 30px;
  background-color: #f5f5f5;
  height: 100%;
}

h1 {
  font-size: 18px;
}

h2 {
  font-size: 16px;
  font-weight: 600;
}

h3 {
  font-weight: 200;
  color: var(--grey);
  font-size: 15px;
}

/* header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 80px;
  margin-bottom: 20px;
}

header img.logo {
  height: 50px;
  margin-right: 10px;
}

header svg {
  height: 25px;
  margin-left: auto;
}
header svg:hover > path {
  fill: var(--main);
}
header svg path.selected {
  fill: var(--main);
}
header svg path {
  fill: rgb(162, 162, 162);
}

header h1 {
  cursor: default;
} */




.select-box h2 {
  margin-right: 10px;
}

input {
  background-color: var(--bg);
  outline: none;
  border: none;
  padding: 10px 25px;
}

.ov {
  box-shadow: var(--shadow);
  border: 1px solid transparent;
}

.ov:hover {
  border: 1px solid var(--main);
}

.pntr:hover {
  cursor: pointer;
}
.relative-footer {
  position: relative;
  bottom: 0;
  width: 100%;
  text-align: center;
  margin-top: 40px;
}

.fixed-footer {
  position: fixed;
  left: 0;
  bottom: 20px;
  width: 100%;
  text-align: center;
}

.hidden {
  display: none;
}
</style>
