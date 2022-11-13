import authService from "@/services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, credentials) {
      return authService.login(credentials).then(
        (user) => {
          commit("authSuccess", user);
          return Promise.resolve(user);
        },
        (error) => {
          commit("authFailure");
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      authService.logout();
      commit("logout");
    },
  },
  mutations: {
    authSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = authService.parseJwt(user.accessToken);
    },
    authFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
    },
  },
};
