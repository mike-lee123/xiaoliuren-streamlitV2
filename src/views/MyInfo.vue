<template>
  <div id="app" class="login-container">
    <h1>我的資料</h1>

    <div v-if="userStore.isAuthenticated && editableUser">
      <p class="welcome">✅ 歡迎你，{{ editableUser.name || editableUser.account }}</p>

      <div class="form-grid">
        <div
          v-for="(value, key) in editableUser"
          :key="key"
          v-if="key !== 'id'"
          class="form-group"
        >
          <label :for="key">{{ key }}：</label>
          <input
            :id="key"
            v-model="editableUser[key]"
            :type="key.toLowerCase().includes('password') ? 'password' : 'text'"
          />
        </div>
      </div>

      <div class="button-group">
        <button @click="saveUser">儲存修改</button>
        <button @click="logout" class="logout">登出</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const router = useRouter()

const editableUser = ref(null)

function formatDate(value) {
  const d = new Date(value)
  if (isNaN(d.getTime())) return value
  return d.toISOString().slice(0, 10)
}

function formatUserForEdit(user) {
  const formatted = {}
  for (const [key, value] of Object.entries(user)) {
    if (key.toLowerCase().includes('id')) continue
    formatted[key] = key.toLowerCase().includes('birthday') ? formatDate(value) : value
  }
  return formatted
}

async function saveUser() {
  if (!editableUser.value || !editableUser.value.account) {
    alert("找不到使用者帳號，無法儲存")
    return
  }

  const baseUrl = "https://script.google.com/macros/s/AKfycbyUjsJkcCRZj0xnwNd06TGa4rMdu6mM_93wZnlGIJswBvFmgffQD07G44k-cOcsUp30Hg/exec"

  console.log("userStore.user.ID,",userStore.user.id)
  const payload = {
    action: "update",
    id: userStore.user.id,
    ...editableUser.value,
  }

  const params = new URLSearchParams(payload)

  try {
    const res = await axios.get(`${baseUrl}?${params.toString()}`)
    if (res.data && res.data.result === "success") {
      userStore.setUser({ ...editableUser.value })
      localStorage.setItem("user", JSON.stringify(editableUser.value))
      alert("修改成功 ✅")
    } else {
      console.error("更新失敗：", res.data)
      alert("更新失敗 ❌")
    }
  } catch (error) {
    console.error("傳送資料錯誤：", error)
    alert("儲存失敗，請稍後再試！")
  }
}

function logout() {
  userStore.clearUser()
  localStorage.removeItem("user")
  localStorage.removeItem("token")
  editableUser.value = null
  router.push("/login")
}

onMounted(() => {
  const savedUser = localStorage.getItem("user")
  const savedToken = localStorage.getItem("token")

  if (savedUser && savedToken) {
    const user = JSON.parse(savedUser)
    userStore.setUser(user)
    userStore.setToken(savedToken)
  }

  if (userStore.user) {
    editableUser.value = formatUserForEdit(userStore.user)
  }
})
</script>




<style scoped>
.login-container {
  width: 90%;
  max-width: 1000px;
  margin: 80px auto;
  padding: 40px 24px;
  background-color: #f9f9f9;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center; /* 整體置中對齊 */
  box-sizing: border-box;
}

/* 表單欄位排列為網格 */
.form-grid {
  display: grid;
  grid-template-columns: 1fr; /* 預設單欄 */
  gap: 20px;
  margin-top: 20px;
}

/* 螢幕寬時變為兩欄 */
@media (min-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr 1fr;
  }
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

/* 表單組 */
.form-group {
  text-align: left;
}

label {
  display: block;
  margin-bottom: 6px;
  color: #555;
  font-size: 14px;
  font-weight: bold; /* 加粗欄位名 */
}

input {
  width: 80%;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus {
  border-color: #007aff;
  outline: none;
  box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
}

/* 按鈕組 */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
}

@media (min-width: 768px) {
  .button-group {
    flex-direction: row;
  }

  button + button {
    margin-left: 10px;
  }
}

button {
  padding: 12px 20px;
  font-size: 16px;
  background-color: #007aff;
  color: #fff;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #005ecb;
}

button.logout {
  background-color: #ff3b30;
}

button.logout:hover {
  background-color: #e03a2b;
}

/* RWD：小螢幕調整 */
@media (max-width: 600px) {
  .login-container {
    padding: 20px 16px;
  }

  h1 {
    font-size: 20px;
  }

  input {
    font-size: 14px;
  }
}
</style>
