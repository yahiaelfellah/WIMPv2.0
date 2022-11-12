<template>
  <!-- <div>
    <h1>LOGIN</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="username" />
      <br />
      <br />
      <input v-model="password" placeholder="password" type="password" />
      <br />
      <br />
      <button type="submit">Login</button>
    </form>
  </div>
  <div> -->
  <div class="credentials-form">
    <img class="logo" :src="require('../assets/logo.svg')" />
    <h1 class="title">
      <span>W</span><span>I</span><span>M</span><span class="highlight">P</span
      ><span></span>
    </h1>
    <form @submit.prevent="login" id="login-form">
      <input type="hidden" name="_csrf" value="{{csrfToken}}" />
      <div class="credential">
        <p class="credential-title">Username :</p>
        <input
          v-model="username"
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          class="credential-input ov"
        />
      </div>
      <div class="credential">
        <p class="credential-title">Password :</p>
        <input
          v-model="password"
          name="password"
          type="password"
          placeholder="Password"
          class="credential-input ov"
        />
      </div>
      <input type="submit" value="Login" class="credential-submit pntr" />
      <div class="redirect">
        <p class="link pntr">Forgot password ?</p>
        <p class="link pntr">Sign-up</p>
      </div>
    </form>
  </div>
  <footer class="fixed-footer">
    <h3 class="footer-text">&copy; 2022 WIMP</h3>
  </footer>
</template>
<script>
// import axios from "axios";
import AuthService from "../services/auth.service";
export default {
  name: "vue-login",
  data: () => {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const body = {
        username: this.username,
        password: this.password,
      };
      const res = await AuthService.login(body);


      // const res = await axios.post("http://localhost:3000/api/v1/auth", body, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      console.log(res);
    },
  },
};
</script>
<style scoped>
body {
  background-color: #f5f5f5;
  overflow: hidden;
}

.logo {
  width: 150px;
  height: auto;
}

.title {
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 20px;
  margin-top: 0;
}

.credentials-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#login-form {
  width: 25%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.credential {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin: 10px 0;
  text-align: left;
  width: 100%;
  height: 100%;
}

.credential-title {
  font-weight: 600;
  margin-bottom: 15px;
}

.credential-input {
  width: 100%;
  background-color: var(--bg);
  outline: none;
  border: none;
  border-radius: 100px;
  padding: 10px 25px;
  margin-bottom: 10px;
  font-size: var(--small-text);
}

.credential-submit {
  color: var(--bg);
  padding: 8px 35px;
  transition: background-color 0.2s, color 0.2s;
  border: 1px solid var(--main);
  border-radius: 100px;
  background-color: var(--main);
  font-size: var(--small-text);
  font-weight: 600;
  margin: 20px 0;
}

.credential-submit:hover {
  color: var(--main);
  background-color: transparent;
}

.redirect {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.link {
  margin: 0 15px;
  font-size: var(--small-text);
  color: var(--main);
}

.link:hover {
  text-decoration: underline;
}

h1 span {
  margin: 0;
  transition: all 0.5s cubic-bezier(0.41, 0.14, 0.79, 0.9);
}

h1:hover span:nth-child(-n + 4) {
  margin-right: 15px;
}

h1:hover span:nth-child(1):after {
  content: "HERE";
}

h1:hover span:nth-child(2):after {
  content: "S";
}

h1:hover span:nth-child(3):after {
  content: "Y";
}

h1:hover span:nth-child(4):after {
  content: "ROFESSOR";
  color: var(--main);
}

h1:hover span:nth-child(5):after {
  content: "?";
}

h1:hover .highlight {
  color: var(--main);
  text-shadow: 0 0 20px var(--main), 0 0 200px var(--main), 0 0 50px var(--main);
}
</style>