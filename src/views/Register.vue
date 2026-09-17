<template>
  <div id="app">
    <h1>註冊登入</h1>

    <!-- 表單區塊 -->
    <div v-if="!showResult && !loading">
      <h2>填寫你的資料</h2>
      <form @submit.prevent="submitForm">
        <div class="form-row">
          <div class="form-group">
            <label for="account">帳號:</label>
            <input type="text" id="account" v-model="formData.account" required />
          </div>
          <div class="form-group">
            <label for="password">密碼:</label>
            <input type="password" id="password" v-model="formData.password" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="name">姓名:</label>
            <input type="text" id="name" v-model="formData.name" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="gender">性別:</label>
            <select id="gender" v-model="formData.gender" required>
              <option value="male">男</option>
              <option value="female">女</option>
              <option value="other">其他</option>
            </select>
          </div>
        </div>
        <button type="submit">提交資料</button>
      </form>
    </div>

    <!-- 轉蛋按鈕 -->
    <div class="login-icon" v-show="!loading">
      <button @click="loveDrawRoll">
        開始配對 <i class="fas fa-user"></i>
      </button>
    </div>
    <div class="login-icon" v-show="!loading">
      <button @click="userImage">
        圖片專區 <i class="fas fa-user"></i>
      </button>
    </div>

    <!-- 提交成功顯示區塊 -->
    <div v-if="showResult">
      <h2>資料已成功提交！</h2>
      <p><strong>帳號:</strong> {{ formData.account }}</p>
      <p><strong>姓名:</strong> {{ formData.name }}</p>
      <p><strong>聯絡方式:</strong> {{ formData.contact }}</p>
      <p><strong>性別:</strong> {{ formData.gender }}</p>
      <p><strong>生日:</strong> {{ formData.birthday }}</p>
      <p><strong>性格特徵:</strong> {{ formData.personality }}</p>
      <p><strong>興趣愛好:</strong> {{ formData.interests }}</p>
      <p><strong>教育背景:</strong> {{ formData.education }}</p>
      <p><strong>職業:</strong> {{ formData.occupation }}</p>
      <p><strong>生活方式:</strong> {{ formData.lifestyle }}</p>
      <p><strong>戀愛觀/婚姻觀:</strong> {{ formData.relationship_view }}</p>
      <p><strong>地理位置:</strong> {{ formData.location }}</p>
      <p><strong>是否有孩子:</strong> {{ formData.has_children }}</p>
      <p><strong>理想伴侶:</strong> {{ formData.ideal_partner }}</p>
      <p><strong>收入範圍:</strong> {{ formData.income_range }}</p>
      <p><strong>宗教信仰:</strong> {{ formData.religion }}</p>
      <p><strong>寵物或動物喜好:</strong> {{ formData.pets }}</p>
      <p><strong>飲食偏好:</strong> {{ formData.diet_preference }}</p>
      <p><strong>轉蛋結果:</strong> {{ result }}</p>
      <button @click="resetForm">重新填寫資料</button>
    </div>

    <!-- 載入中顯示區塊 -->
    <div v-if="loading" class="loading">
      <p>正在提交資料...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      formData: {
        account: "",
        password: "",
        name: "",
        contact: "",
        gender: "",
        birthday: "",
        personality: "",
        interests: "",
        education: "",
        occupation: "",
        lifestyle: "",
        relationship_view: "",
        location: "",
        has_children: "",
        ideal_partner: "",
        income_range: "",
        religion: "",
        pets: "",
        diet_preference: ""
      },
      result: "",
      showResult: false,
      loading: false,
      gachaResults: [
        "你是一位浪漫冒險家，總是敢於追求自己的愛情故事。",
        "今日桃花運旺盛，記得把握這個美好的機會。",
        "你的靈魂伴侶就在附近，或許下次相遇，你們就能擦出火花。",
        "小心感情詐騙，保持謹慎，愛情才會更美好。",
        "愛神正在射箭中，準備迎接愛情的降臨吧！",
        "你的真愛正等待你的一次勇敢表白，勇氣是你最大的力量。",
        "你是那個能夠改變世界的人，愛情對你來說不再是幻想。",
        "幸福的愛情會在不經意間到來，保持心中的美好期待。",
        "你是愛情中的守護天使，不必擔心，愛會在你最需要的時候來臨。",
        "當你放下過去，愛情會以更美好的方式重生。",
        "誠實與勇敢，是愛情中最值得珍惜的品質。祝你在愛中找到真心。",
        "你的笑容能融化所有的冰雪，愛情會因為你而變得溫暖。"
      ]
    };
  },
  methods: {
    loveDrawRoll() {
      this.$router.push("/loveDrawRoll");
    },
    userImage() {
      this.$router.push("/userImage");
    },
    submitForm() {
      this.loading = true;
      const baseUrl =
        "https://script.google.com/macros/s/AKfycbyUjsJkcCRZj0xnwNd06TGa4rMdu6mM_93wZnlGIJswBvFmgffQD07G44k-cOcsUp30Hg/exec";
      const selectedResult =
        this.gachaResults[
          Math.floor(Math.random() * this.gachaResults.length)
        ];
      const params = new URLSearchParams({
        ...this.formData,
        action: "add",
        result: selectedResult
      });

      axios
        .get(`${baseUrl}?${params.toString()}`)
        .then((response) => {
          this.result = selectedResult;
          this.showResult = true;
          this.loading = false;
        })
        .catch((error) => {
          console.error("提交資料時發生錯誤：", error);
          this.loading = false;
          alert("提交資料失敗，請再試一次！");
        });
    },
    resetForm() {
      this.showResult = false;
      this.formData = {
        account: "",
        password: "",
        name: "",
        contact: "",
        gender: "",
        birthday: "",
        personality: "",
        interests: "",
        education: "",
        occupation: "",
        lifestyle: "",
        relationship_view: "",
        location: "",
        has_children: "",
        ideal_partner: "",
        income_range: "",
        religion: "",
        pets: "",
        diet_preference: ""
      };
    }
  }
};
</script>

<style scoped>
#app {
  text-align: center;
  margin-top: 50px;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

form {
  margin: 0 auto;
  max-width: 600px;
  text-align: left;
}

.form-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.form-group {
  width: 48%;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}

input, select {
  width: 100%;
  padding: 6px 10px;
  box-sizing: border-box;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #e91e63;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #c2185b;
}

.loading {
  font-size: 1.2em;
  color: #999;
}

.login-icon {
  margin-top: 20px;
}
</style>
