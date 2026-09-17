// src/stores/user.js
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: '',
      account: '',
      birthday: '',
      contact: '',
      dietPreference: '',
      education: '',
      gachaResult: '',
      gender: '',
      hasChildren: '',
      hobbies: '',
      idealPartner: '',
      incomeRange: '',
      lifestyle: '',
      location: '',
      name: '',
      occupation: '',
      password: '',
      personality: '',
      pets: '',
      relationship_view: '',
      religion: '',
      selfIntroduction: '',
    },
    token: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },

  actions: {
    setUser(userData) {
      console.log("設定使用者：", userData);
      this.user = { ...userData }; // 直接覆蓋整個 user 物件
    },
    setToken(token) {
      console.log("設定 token：", token);
      this.token = token;
    },
    clearUser() {
      this.user = {
        ID: '',
        account: '',
        birthday: '',
        contact: '',
        dietPreference: '',
        education: '',
        gachaResult: '',
        gender: '',
        hasChildren: '',
        hobbies: '',
        idealPartner: '',
        incomeRange: '',
        lifestyle: '',
        location: '',
        name: '',
        occupation: '',
        password: '',
        personality: '',
        pets: '',
        relationship_view: '',
        religion: '',
        selfIntroduction: '',
      };
      this.token = null;
    },
  },
});
