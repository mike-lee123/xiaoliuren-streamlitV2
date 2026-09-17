<template>
  <div id="app">
    <h1>💘 愛情轉蛋機</h1>

    <!-- 配對按鈕 -->
    <div v-if="!showResult && !loading" class="button-wrapper">
      <button @click="fetchRandomMatch">開始配對</button>
    </div>

    <!-- 載入中 + 動畫 -->
    <div v-if="loading" class="loading">
      <p>正在生成配對結果...</p>
      <div class="gacha-animation">
        <div class="gacha-machine">
          <div class="egg rotating"></div>
        </div>
      </div>
    </div>

    <!-- 結果顯示卡片 -->
    <div v-if="showResult" class="result-card">
      <h2>✨ 配對結果</h2>
      <div class="info-list">
        <p><strong>姓名:</strong> {{ result.name }}</p>
        <p><strong>聯絡方式:</strong> {{ result.contact }}</p>
        <p><strong>自我介紹:</strong> {{ result.selfIntroduction }}</p>
        <p><strong>轉蛋結果:</strong> {{ result.gachaResult }}</p>
        <p><strong>性別:</strong> {{ result.gender }}</p>
        <p><strong>生日:</strong> {{ result.birthday }}</p>
        <p><strong>性格特徵:</strong> {{ result.personality }}</p>
        <p><strong>興趣愛好:</strong> {{ result.hobbies }}</p>
        <p><strong>教育背景:</strong> {{ result.education }}</p>
        <p><strong>職業:</strong> {{ result.occupation }}</p>
        <p><strong>生活方式:</strong> {{ result.lifestyle }}</p>
        <p><strong>戀愛觀/婚姻觀:</strong> {{ result.relationship_view }}</p>
        <p><strong>地理位置:</strong> {{ result.location }}</p>
        <p><strong>是否有孩子:</strong> {{ result.hasChildren }}</p>
        <p><strong>理想伴侶:</strong> {{ result.idealPartner }}</p>
        <p><strong>收入範圍:</strong> {{ result.incomeRange }}</p>
        <p><strong>宗教信仰:</strong> {{ result.religion }}</p>
        <p><strong>寵物或動物喜好:</strong> {{ result.pets }}</p>
        <p><strong>飲食偏好:</strong> {{ result.dietPreference }}</p>
      </div>

      <button @click="fetchRandomMatch" class="again-btn">再抽一次</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      result: {},
      showResult: false,
      loading: false
    };
  },
  methods: {
    fetchRandomMatch() {
      this.loading = true;
      this.showResult = false;

      const apiUrl =
        "https://script.google.com/macros/s/AKfycbyUjsJkcCRZj0xnwNd06TGa4rMdu6mM_93wZnlGIJswBvFmgffQD07G44k-cOcsUp30Hg/exec?action=list";

      axios
        .get(apiUrl)
        .then((response) => {
          const allMatches = response.data.records;

          if (!Array.isArray(allMatches) || allMatches.length === 0) {
            throw new Error("沒有任何配對資料");
          }

          const randomIndex = Math.floor(Math.random() * allMatches.length);
          this.result = allMatches[randomIndex];
          this.showResult = true;
        })
        .catch((error) => {
          console.error("發生錯誤：", error);
          alert("取得配對資料失敗，請稍後再試！");
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>
#app {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  color: #1c1c1e;
  background-color: #f2f2f7;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: all 0.3s ease;
}

h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #111;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #007aff;
}

.button-wrapper {
  margin-top: 1.5rem;
}

button {
  background: linear-gradient(135deg, #007aff, #34c759);
  color: white;
  border: none;
  padding: 0.8rem 1.6rem;
  font-size: 1.1rem;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 122, 255, 0.4);
  transition: all 0.3s ease;
}
button:hover {
  transform: scale(1.05);
}

.again-btn {
  margin-top: 2rem;
}

.loading {
  font-size: 1.2rem;
  color: #666;
  margin-top: 1rem;
}

/* 轉蛋動畫樣式 */
.gacha-animation {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.gacha-machine {
  width: 100px;
  height: 100px;
  position: relative;
  animation: bounce 1.2s infinite;
}

.egg {
  width: 60px;
  height: 60px;
  background: radial-gradient(circle at 30% 30%, #fff, #fcd34d);
  border-radius: 50%;
  border: 3px solid #ccc;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  margin: 0 auto;
}

.rotating {
  animation: rotateEgg 1s linear infinite;
}

@keyframes rotateEgg {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.result-card {
  background-color: #fff;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  text-align: left;
  animation: fadeIn 0.5s ease;
  margin-top: 2rem;
}

.info-list p {
  margin: 0.5rem 0;
  font-size: 1rem;
  line-height: 1.6;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.3rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
