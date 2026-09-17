<template>
  <div id="app">
    <header>
      <h1>💖 生命靈數分析 💖</h1>
    </header>
    <img src="https://i.imgur.com/sWvnFma.jpeg" alt="靈數圖片" class="personality-img">
    <section>
      
      <label for="birthdate">請輸入您的生日 (YYYY-MM-DD)：</label>
      <input type="date" v-model="birthdate" @input="calculateLifeNumbers" />
      <button @click="calculateLifeNumbers" :disabled="!birthdate">計算</button>
    </section>

    <section v-if="lifePathNumber !== null">

  
      <h2>🌸 您的個人靈數分析 🌸</h2>
      <img v-if="lifePathNumber === 8" src="https://i.imgur.com/E0h9gA6.png" alt="靈數8的圖片" class="personality-img">
      <img v-if="lifePathNumber === 1" src="https://i.imgur.com/xHKe738.png" alt="靈數1的圖片" class="personality-img">
      <img v-if="lifePathNumber === 2" src="https://i.imgur.com/sVtpmDH.png" alt="靈數2的圖片" class="personality-img">
      <img v-if="lifePathNumber === 3" src="https://i.imgur.com/Gvip84y.png" alt="靈數3的圖片" class="personality-img">
      <img v-if="lifePathNumber === 4" src="https://i.imgur.com/6ZSwTag.png" alt="靈數3的圖片" class="personality-img">
      <img v-if="lifePathNumber === 5" src="https://i.imgur.com/EIbQsFA.png" alt="靈數3的圖片" class="personality-img">
      <img v-if="lifePathNumber === 6" src="https://i.imgur.com/M6smzgq.png" alt="靈數3的圖片" class="personality-img">
      <img v-if="lifePathNumber === 7" src="https://i.imgur.com/7eIaH2A.png" alt="靈數3的圖片" class="personality-img">
      <img v-if="lifePathNumber === 9" src="https://i.imgur.com/Gvip84y.png" alt="靈數3的圖片" class="personality-img">

      <p>您的<strong>生命靈數</strong>是：<strong>{{ lifePathNumber }}</strong> - {{ lifePathTags[lifePathNumber] }}</p>
      <p>{{ lifePathDescriptions[lifePathNumber] }}</p>
      
      <p>您的<strong>人格數</strong>是：<strong>{{ personalityNumber }}</strong></p>
      <p>{{ personalityDescriptions[personalityNumber] }}</p>
      
      <p>您的<strong>靈魂數</strong>是：<strong>{{ soulNumber }}</strong></p>
      <p>{{ soulDescriptions[soulNumber] }}</p>
      
      <p>您的<strong>命運數</strong>是：<strong>{{ destinyNumber }}</strong></p>
      <p>{{ destinyDescriptions[destinyNumber] }}</p>
      
      <h3>💖 愛情與友情建議 💖</h3>
      <p class="love-border"><strong>理想愛人數字：</strong> {{ idealLoverNums }}</p>
      <p class="love-border"><strong>理想朋友數字：</strong> {{ idealFriendNums }}</p>
      <img v-if="lifePathNumber === 1" src="https://i.imgur.com/GgcryBA.png" alt="靈數1的圖片" class="personality-img">
      <h2>💌 個人化靈數報告 💌</h2>
      <p class="report-box">{{ personalReport }}</p>
  
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import lifeData from '../assets/lifeDigit.json';

const birthdate = ref("");
const lifePathNumber = ref(null);
const personalityNumber = ref(null);
const soulNumber = ref(null);
const destinyNumber = ref(null);
const { lifePathDescriptions, lifePathTags, personalityDescriptions, destinyDescriptions, soulDescriptions, loveCompatibility, friendshipCompatibility } = lifeData;

const reduceToSingleDigit = (num) => {
  num = num.toString().padStart(4, '0');  // 確保長度一致，處理像 0111 這樣的情況
  while (num.length > 1) {
    num = num.split("").reduce((acc, n) => acc + Number(n), 0).toString();
  }
  return Number(num);
};
const calculateLifeNumbers = () => {
  if (!birthdate.value) return;
  const digits = birthdate.value.replace(/-/g, "").split("").map(Number);
  lifePathNumber.value = reduceToSingleDigit(digits.reduce((acc, num) => acc + num, 0));

  const dayDigits = birthdate.value.split("-")[2].split("").map(Number);
  personalityNumber.value = reduceToSingleDigit(dayDigits.reduce((acc, num) => acc + num, 0));

  const monthDigits = birthdate.value.split("-")[1].split("").map(Number);
  soulNumber.value = reduceToSingleDigit(monthDigits.reduce((acc, num) => acc + num, 0));

  const yearDigits = birthdate.value.split("-")[0].split("").map(Number);
  destinyNumber.value = reduceToSingleDigit(yearDigits.reduce((acc, num) => acc + num, 0));
};

const idealLoverNums = computed(() => {
  return loveCompatibility[lifePathNumber.value]?.idealLoverNum.join(", ") || "尚無資料";
});

const idealFriendNums = computed(() => {
  return friendshipCompatibility[lifePathNumber.value]?.idealFriendNum.join(", ") || "尚無資料";
});

const personalReport = computed(() => {
  if (lifePathNumber.value === null || personalityNumber.value === null || soulNumber.value === null || destinyNumber.value === null) {
    return '';
  }

  const loveMatch = loveCompatibility[lifePathNumber.value]?.idealLover || "尚無資料";
  const friendMatch = friendshipCompatibility[lifePathNumber.value]?.idealFriend || "尚無資料";

  return `💕 您的生命靈數為 ${lifePathNumber.value}（${lifePathTags[lifePathNumber.value]}），這代表 ${lifePathDescriptions[lifePathNumber.value]}
  🌹 人格數是 ${personalityNumber.value}，顯示您的外在形象與個人風格：${personalityDescriptions[personalityNumber.value]}
  💞 靈魂數為 ${soulNumber.value}，代表內在動力與情感需求：${soulDescriptions[soulNumber.value]}
  💍 命運數是 ${destinyNumber.value}，這揭示了您的人生目標與發展方向：${destinyDescriptions[destinyNumber.value]}
  
  💖 **愛情建議**：${loveMatch}
  
  🤝 **友情建議**：${friendMatch}
  
  ✨ 綜合來看，您是一個 ${lifePathDescriptions[lifePathNumber.value]}，並且適合從事 ${destinyDescriptions[destinyNumber.value]} 相關的職業。`;
});
</script>

<style scoped>
#app {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  text-align: center;
  background-color: #FFF0F5; /* 柔和的粉色背景 */
}

h1 {
  margin-bottom: 20px;
  color: #E91E63;
  font-weight: bold;
}

section {
  margin-bottom: 20px;
  background: #FFE4E1;
  padding: 15px;
  border-radius: 10px;
}

button {
  margin-top: 10px;
  padding: 10px 15px;
  border: none;
  background-color: #FF4081;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #E91E63;
}

.love-border {
  padding: 10px;
  margin-bottom: 10px;
  background-color: #db6b81;
  border: 2px solid #4050ff;
  border-radius: 5px;
  color: #880E4F;
}

.report-box {
  border-left: 5px solid #FF4081;
  padding: 15px;
  background-color: #FFD1DC;
  font-size: 16px;
  color: #880E4F;
  line-height: 1.8;
  text-align: left;
  white-space: pre-line;
  width: 90%;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.personality-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.personality-img {
  max-width: 150px; /* 調整圖片大小 */
  height: auto;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.personality-text {
  margin-left: 20px;
  text-align: left;
  flex: 1;
}
</style>
