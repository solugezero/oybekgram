import { defineStore } from "pinia";

export const useAuth = defineStore("auth", {
  state: () => ({
    _id: "",
    token: "",
    username: "",
  }),
  actions: {
    setId(_id) {
      this._id = _id;
    },
    setToken(token) {
      this.token = token;
    },
    setUsername(username) {
      this.username = username;
    },
  },
  getters: {
    getToken: (state) => state.token,
    getUserId: (state) => state._id,
  },
});
