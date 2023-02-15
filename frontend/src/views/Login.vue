<template>
  <div>
    <div class="credentials-form">
      <img class="logo" :src="require('../assets/logo.svg')" />
      <h1 class="title">
        <span>W</span><span>I</span><span>M</span
        ><span class="highlight">P</span><span></span>
      </h1>
      <form @submit.prevent="login" id="login-form">
        <div class="credential">
          <p class="credential-title">Username :</p>
          <input
            v-model="values.username"
            v-validate="'required|min:3|max:20'"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            class="credential-input ov"
          />
          <div v-if="submitted && !!errors.username" class="alert alert-danger">
            <div v-for="error in errors.username" :key="error">
              {{ error }}
            </div>
          </div>
        </div>
        <div class="credential">
          <p class="credential-title">Password :</p>
          <input
            v-model="values.password"
            name="password"
            type="password"
            placeholder="Password"
            class="credential-input ov"
          />
          <div v-if="submitted && !!errors.password" class="alert alert-danger">
            <div v-for="error in errors.password" :key="error">
              {{ error }}
            </div>
          </div>
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
  </div>
</template>
<script>
import { object, string } from "yup";
import { ElMessage } from "element-plus";

import { ElLoading } from "element-plus";
import { AuthenticationService } from "../services/auth.service";

const loginFormSchema = object().shape({
  username: string().required().min(3).max(20),
  password: string().required(),
});
export default {
  name: "vue-login",
  data: () => {
    return {
      values: {
        username: "",
        password: "",
      },
      errors: {
        username: [],
        password: [],
      },

      loading: false,
      submitted: false,
      successful: false,
      message: "",
    };
  },
  created() {
    if (AuthenticationService.currentUserValue) {
      this.$router.push("/");
    }
    this.returnUrl = this.$route.query.returnUrl || "/";
  },
  computed: {
    usernameErrors() {
      return this.errors.username.join(",");
    },
  },
  methods: {
    validate(field) {
      loginFormSchema
        .validateAt(field, this.values)
        .then(() => {
          this.errors[field] = "";
        })
        .catch((err) => {
          this.errors[field] = err.message;
        });
    },
    login() {
      //this.loading = true;
      this.submitted = true;
      this.errors = { username: [], password: [] };
      this.loading = ElLoading.service({
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      loginFormSchema
        .validate(this.values, { abortEarly: false })
        .then(() => {
          AuthenticationService.login(this.values).then(
            () => {
              this.loading.close();
              this.$router.push("/");
            },
            (error) => {
              this.loading.close();
              this.message =
                (error.response && error.response.data) || error.message;
              ElMessage({
                message: this.message,
                type: "error",
                showClose: true,
              });
            }
          );
        })
        .catch((err) => {
          this.loading.close();

          for (let i in err.inner) {
            this.errors[err.inner[i].path].push(err.inner[i].message);
          }
        });
    },
  },
};
</script>
<style scoped>
body {
  background-color: #f5f5f5;
  overflow: hidden;
}
.title {
  margin-bottom: 5%;
  display: flex;
  justify-content: center;
}

.logo {
  width: 150px;
  height: auto;
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

.alert-danger {
  font-size: small;
  color: red;
  font-style: italic;
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