<template>
  <header>
    <img :src="require('../assets/logo.svg')" class="logo" />
    <h1>WIMP</h1>

    <button id="logout-btn" class="pntr" @click="handleLogout">Logout</button>
  </header>
  <nav>
    <div class="select-box ov">
      <h2>Building :</h2>
      <el-select v-model="value" class="m-2" placeholder="Select" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <!-- <select id="building-selector" class="pntr">
                <option value="All">All</option>
            </select> -->
    </div>
    <div class="select-box ov">
      <h2>Department :</h2>
      <el-select v-model="value" class="m-2" placeholder="Select" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="search">
      <input id="search-bar" placeholder="Name" class="ov" />
    </div>
    <div class="refresh">
      <button id="refresh-btn">
        <el-icon><Refresh /></el-icon>
        <!-- <i class="fa fa-refresh pntr" aria-hidden="true"></i> -->
      </button>
    </div>
  </nav>

  <main>
    <article class="card pntr">
      <!-- <img id="pp-{{id}}" value="{{pp}}" src=""></img> -->
      <h1>
        <span id="firstName" value="{{firstNameRaw}}">{{ firstName }}</span>
        <span id="lastName">{{ lastName }}</span>
      </h1>
      <h3>
        <span id="department">{{ department }}</span>
      </h3>
      <h3>
        <span id="building">{{ building }}</span>
        <span id="office">{{ office }}</span>
      </h3>
      <p class="status {{statusColor}}">{{ statusMsg }}</p>
    </article>
  </main>
</template>
<script>
import { AuthenticationService} from "../services/auth.service"
import { Role } from "../helpers/roles";

const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];
export default {
  name: "vue-home",
  data() {
    return options;
  },
  mounted(){
    if(AuthenticationService.currentUserValue.roles === Role.Master){
      this.$router.push('/admin');
    }
  },
  methods:{
    handleLogout(){
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
<style scoped>
nav select {
  outline: none;
  border: none;
  border-radius: 10%;
}

nav div input {
  background-color: var(--bg);
  outline: none;
  border: none;
  border-radius: 100px;
  padding: 10px 25px;
  font-size: 16px;
}

nav > * {
  margin: 0 20px;
}

nav {
  width: fit-content;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  margin-bottom: 50px;
  align-items: center;
  justify-content: center;
}
nav .select-box {
  background-color: var(--bg);
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 100px;
  width: max-content;
}

option {
  text-align: right;
}

.card p {
  margin-top: auto;
  margin-bottom: 20px;
}

.card img {
  width: 70px;
  height: 70px;
  border-radius: 100px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.card {
  background-color: var(--bg);
  box-shadow: var(--shadow);
  margin: 0 auto;
  width: 200px;
  height: 260px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid transparent;
}

.card h1 {
  text-align: center;
}

.card:hover {
  border: 1px solid var(--main);
}

main {
  margin: 0 auto;
  width: 70vw;
  /**
   * User input values.
   */
  --grid-layout-gap: 5px;
  --grid-column-count: 5;
  --grid-item--min-width: 200px;

  /**
   * Calculated values.
   */
  --gap-count: calc(var(--grid-column-count) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
  --grid-item--max-width: calc(
    (100% - var(--total-gap-width)) / var(--grid-column-count)
  );

  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr)
  );
  grid-gap: var(--grid-layout-gap);

  row-gap: 30px;
}

.status {
  font-size: var(--small-text);
  padding: 7px 20px;
  border-radius: 100px;
  text-align: center;
  max-width: 80%;
}

.status.green {
  background-color: var(--greenT);
  color: var(--green);
}

.status.orange {
  background-color: var(--orangeT);
  color: var(--orange);
}

.status.red {
  background-color: var(--redT);
  color: var(--red);
}

.status.grey {
  background-color: #d5d1db;
  color: var(--grey);
}

.status.state {
  background-color: #f5f5f5;
  color: var(--grey);
}

header button {
  margin-left: auto;
}

@media only screen and (max-width: 950px) {
  nav > * {
    margin: 0 0px;
  }
  nav {
    width: 70vw;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    margin-top: 50px;
  }
  nav .select-box {
    background-color: var(--bg);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 20px;
    border-radius: 100px;
    width: auto;
    margin: 8px 0;
  }
  nav .search {
    width: auto;
  }
  #search-bar {
    width: 100%;
  }
  nav .refresh {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
}
</style>