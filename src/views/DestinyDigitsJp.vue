<template>
  <div id="app">
    <header>
      <h1>💖 生命数秘術診断 💖</h1>
    </header>
    <img src="https://i.imgur.com/sWvnFma.jpeg" alt="数秘術画像" class="personality-img">
<section>
  <label for="birthdate">生年月日を入力してください (YYYY-MM-DD)：</label>
  <input type="date" v-model="birthdate" @input="calculateLifeNumbers" />
  <button @click="calculateLifeNumbers" :disabled="!birthdate">計算</button>
</section>

    <section v-if="lifePathNumber !== null">
      <h2>🌸 あなたの個人診断 🌸</h2>
      <img v-if="lifePathNumber === 8" src="https://i.imgur.com/E0h9gA6.png" alt="数秘術8の画像" class="personality-img">
      <img v-if="lifePathNumber === 1" src="https://i.imgur.com/xHKe738.png" alt="数秘術1の画像" class="personality-img">
      <img v-if="lifePathNumber === 2" src="https://i.imgur.com/sVtpmDH.png" alt="数秘術2の画像" class="personality-img">
      <img v-if="lifePathNumber === 3" src="https://i.imgur.com/Gvip84y.png" alt="数秘術3の画像" class="personality-img">
      <img v-if="lifePathNumber === 4" src="https://i.imgur.com/6ZSwTag.png" alt="数秘術4の画像" class="personality-img">
      <img v-if="lifePathNumber === 5" src="https://i.imgur.com/EIbQsFA.png" alt="数秘術5の画像" class="personality-img">
      <img v-if="lifePathNumber === 6" src="https://i.imgur.com/M6smzgq.png" alt="数秘術6の画像" class="personality-img">
      <img v-if="lifePathNumber === 7" src="https://i.imgur.com/7eIaH2A.png" alt="数秘術7の画像" class="personality-img">
      <img v-if="lifePathNumber === 9" src="https://i.imgur.com/Gvip84y.png" alt="数秘術9の画像" class="personality-img">
      
      <p>あなたの<strong>ライフパスナンバー</strong>は：<strong>{{ lifePathNumber }}</strong> - {{ lifePathTags[lifePathNumber] }}</p>
      <p>{{ lifePathDescriptions[lifePathNumber] }}</p>
      
      <p>あなたの<strong>ペルソナナンバー</strong>は：<strong>{{ personalityNumber }}</strong></p>
      <p>{{ personalityDescriptions[personalityNumber] }}</p>
      
      <p>あなたの<strong>ソウルナンバー</strong>は：<strong>{{ soulNumber }}</strong></p>
      <p>{{ soulDescriptions[soulNumber] }}</p>
      
      <p>あなたの<strong>ディスティニーナンバー</strong>は：<strong>{{ destinyNumber }}</strong></p>
      <p>{{ destinyDescriptions[destinyNumber] }}</p>
      
      <h3>💖 愛情と友情のアドバイス 💖</h3>
      <p class="love-border"><strong>理想の恋人ナンバー：</strong> {{ idealLoverNums }}</p>
      <p class="love-border"><strong>理想の友人ナンバー：</strong> {{ idealFriendNums }}</p>
      <img v-if="lifePathNumber === 1" src="https://i.imgur.com/GgcryBA.png" alt="数秘術1の画像" class="personality-img">
      <h2>💌 あなただけの数秘術レポート 💌</h2>
      <p class="report-box">{{ personalReport }}</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import lifeData from '../assets/lifedigitJP.json';

const birthdate = ref("");
const lifePathNumber = ref(null);
const personalityNumber = ref(null);
const soulNumber = ref(null);
const destinyNumber = ref(null);
const { lifePathDescriptions, lifePathTags, personalityDescriptions, destinyDescriptions, soulDescriptions, loveCompatibility, friendshipCompatibility } = lifeData;

const reduceToSingleDigit = (num) => {
  if (num === null) return null;
  let sum = num;
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split("").reduce((acc, n) => acc + Number(n), 0);
  }
  return Number(sum);
};

const calculateLifeNumbers = () => {
  if (!birthdate.value) return;
  const [year, month, day] = birthdate.value.split('-').map(Number);
  
  // ライフパスナンバーの計算
  const yearDigits = year.toString().split("").map(Number);
  const monthDigits = month.toString().split("").map(Number);
  const dayDigits = day.toString().split("").map(Number);
  const totalSum = yearDigits.reduce((acc, n) => acc + n, 0) + 
                   monthDigits.reduce((acc, n) => acc + n, 0) + 
                   dayDigits.reduce((acc, n) => acc + n, 0);
  lifePathNumber.value = reduceToSingleDigit(totalSum);

  // ペルソナナンバー（日）の計算
  const daySum = dayDigits.reduce((acc, n) => acc + n, 0);
  personalityNumber.value = reduceToSingleDigit(daySum);

  // ソウルナンバー（月）の計算
  const monthSum = monthDigits.reduce((acc, n) => acc + n, 0);
  soulNumber.value = reduceToSingleDigit(monthSum);

  // ディスティニーナンバー（年）の計算
  const yearSum = yearDigits.reduce((acc, n) => acc + n, 0);
  destinyNumber.value = reduceToSingleDigit(yearSum);
};

const idealLoverNums = computed(() => {
  return loveCompatibility[lifePathNumber.value]?.idealLoverNum.join(", ") || "データなし";
});

const idealFriendNums = computed(() => {
  return friendshipCompatibility[lifePathNumber.value]?.idealFriendNum.join(", ") || "データなし";
});

const personalReport = computed(() => {
  if (lifePathNumber.value === null || personalityNumber.value === null || soulNumber.value === null || destinyNumber.value === null) {
    return '';
  }

  const loveMatch = loveCompatibility[lifePathNumber.value]?.idealLover || "データなし";
  const friendMatch = friendshipCompatibility[lifePathNumber.value]?.idealFriend || "データなし";

  return `
💕 あなたの**ライフパスナンバー**は ${lifePathNumber.value}（${lifePathTags[lifePathNumber.value]}）です。これは、${lifePathDescriptions[lifePathNumber.value]}
🌹 **ペルソナナンバー**は ${personalityNumber.value} で、あなたの外見や個人のスタイルを示します：${personalityDescriptions[personalityNumber.value]}
💞 **ソウルナンバー**は ${soulNumber.value} で、あなたの内なる動機と感情的なニーズを表します：${soulDescriptions[soulNumber.value]}
💍 **ディスティニーナンバー**は ${destinyNumber.value} で、あなたの人生の目標と進むべき道を示します：${destinyDescriptions[destinyNumber.value]}

💖 **恋愛のアドバイス**：${loveMatch}

🤝 **友情のアドバイス**：${friendMatch}

✨ 総合的に見ると、あなたは ${lifePathDescriptions[lifePathNumber.value]} という性質を持ち、 ${destinyDescriptions[destinyNumber.value]} に関連する職業や人生の道に進むことが適しているでしょう。
`;
});
</script>
<style scoped>
#app {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  /* 移除 text-align: center; 以確保所有內容靠左 */
  background-color: #FFF0F5; /* 柔和なピンクの背景 */
}

h1 {
  margin-bottom: 20px;
  color: #E91E63;
  font-weight: bold;
  text-align: left; /* 標題靠左 */
}

h2, h3 {
  text-align: left; /* 確保所有標題都靠左對齊 */
}

section {
  margin-bottom: 20px;
  background: #FFE4E1;
  padding: 15px;
  border-radius: 10px;
  text-align: left; /* 確保 section 內的內容靠左 */
}

button {
  margin-top: 10px;
  padding: 10px 15px;
  border: none;
  background-color: #FF4081;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  /* 移除 margin: auto; 等居中屬性，讓按鈕靠左 */
  display: block; /* 使按鈕獨佔一行，方便排版 */
  margin-left: 0; /* 確保按鈕左對齊 */
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
  text-align: left; /* 確保此區塊內容靠左 */
}

.report-box {
  border-left: 5px solid #FF4081;
  padding: 15px;
  background-color: #FFD1DC;
  font-size: 16px;
  color: #880E4F;
  line-height: 1.8;
  text-align: left; /* 已經是左對齊，保持不變 */
  white-space: pre-line;
  width: 90%;
  margin: 20px auto; /* 保持區塊本身居中，但內部文字左對齊 */
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}

.personality-container {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 圖片和文字靠左對齊 */
  margin-bottom: 20px;
}

.personality-img {
  max-width: 150px; /* 画像サイズを調整 */
  height: auto;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  /* 圖片本身靠左 */
}

.personality-text {
  margin-left: 20px;
  text-align: left;
  flex: 1;
}

/* 確保所有 <p> 標籤都靠左對齊 */
p {
  text-align: left;
}
</style>