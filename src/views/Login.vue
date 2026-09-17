<template>
  <div id="app" class="login-container">
    <h1>登入系統</h1>

    <!-- 登入表單 -->
    <div v-if="!userStore.isAuthenticated && !loading">
      <input v-model="login.account" placeholder="帳號" />
      <input v-model="login.password" type="password" placeholder="密碼" />
      <button @click="register">註冊功能</button>
      <button @click="loginUser">登入</button>
    </div>

    <!-- 登入中 -->
    <div v-if="loading">
      <p>登入中...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useUserStore } from "../stores/userStore";

export default {
  data() {
    return {
      login: {
        account: "",
        password: ""
      },
      loading: false
    };
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  mounted() {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (savedUser && savedToken) {
      const user = JSON.parse(savedUser);
      this.userStore.setUser(user);
      this.userStore.setToken(savedToken);
      this.$router.push("/myInfo"); // 如果已登入直接跳轉
    }
  },
  methods: {
    register() {
      this.$router.push("/register");
    },
    async loginUser() {
      this.loading = true;

      const apiUrl =
        "https://script.google.com/macros/s/AKfycbyUjsJkcCRZj0xnwNd06TGa4rMdu6mM_93wZnlGIJswBvFmgffQD07G44k-cOcsUp30Hg/exec?action=list";

      try {
        const res = await axios.get(apiUrl);
        const allUsers = res.data.records;

        if (!this.login.account || !this.login.password) {
          alert("請填寫帳號和密碼！");
          return;
        }

        const inputAccount = this.login.account.trim();
        const inputPassword = this.login.password.trim();

        const user = allUsers.find((u) => {
          return (
            String(u.account).trim() === inputAccount &&
            String(u.password).trim() === inputPassword
          );
        });

        if (user) {
          this.userStore.setUser(user);
          this.userStore.setToken("dummy_token");

          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", "dummy_token");

          alert("登入成功！");
          this.$router.push("/myinfo");
        } else {
          alert("帳號或密碼錯誤！");
        }
      } catch (err) {
        console.error("登入錯誤：", err);
        alert("登入失敗，請稍後再試！");
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
/* 登入容器 */
.login-container {
  max-width: 400px;
  width: 100%;
  margin: 100px auto;
  text-align: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* 標題設置 */
h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

/* 輸入框設置 */
input {
  display: block;
  margin: 10px auto;
  padding: 12px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #007aff;
  box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
}

/* 按鈕樣式 */
button {
  padding: 12px 20px;
  margin-top: 10px;
  width: 100%;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

/* 按鈕懸停效果 */
button:hover {
  background-color: #005ecb;
}

/* 註冊按鈕 */
button:nth-of-type(1) {
  background-color: #ff3b30;
}

button:nth-of-type(1):hover {
  background-color: #e03a2b;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .login-container {
    max-width: 95%;  /* 手機版容器寬度稍微增加 */
    padding: 15px;   /* 手機版內邊距減少 */
  }

  h1 {
    font-size: 20px;  /* 手機版標題字型稍微縮小 */
  }

  button {
    font-size: 14px;  /* 手機版按鈕字型縮小 */
  }

  input {
    font-size: 14px;  /* 手機版輸入框字型縮小 */
  }
}
</style>
