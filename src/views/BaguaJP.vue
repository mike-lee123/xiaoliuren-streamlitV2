<template>
  <div id="app">
    <header>
      <h1>数字で卜卦</h1>
    </header>

    <!-- 動画を再生するモーダル -->
    <div v-if="showVideoModal" class="video-overlay">
      <div class="video-container">
        <video autoplay muted playsinline @ended="handleVideoEnd" class="video-player" :playbackRate="1.5">
          <source src="https://i.imgur.com/fKD43vz.mp4" type="video/mp4" />
          ご使用のブラウザは動画再生に対応していません。
        </video>
        <button @click="handleVideoEnd" class="skip-button">動画をスキップ</button>
      </div>
    </div>

    <!-- 卜卦の説明 -->
    <section class="instruction">
      <h2>🔮 卜卦の準備</h2>
      <img src="https://i.imgur.com/Qzm82U2.png" alt="八卦占い" class="small-banner" />
      <p>まず落ち着いてから、3つの数字と質問を入力し、カテゴリを選んで卦象を解析してください。</p>

      <div class="warning-box">
        <p><strong>警告：</strong>本プラットフォームの占い結果および解説は参考情報として提供されており、抽選結果に基づくものであり、未来の確定した予測ではありません。当プラットフォームは抽選結果に対して一切責任を負いません。理性的にご利用ください。</p>
        <p>「抽籤」をクリックして同意を選択した時点で、上記条項に同意し、結果が参考のみであることを理解し、本サービスを利用したことによるいかなる結果に対しても自己責任であることに同意したことになります。</p>
      </div>
    </section>

    <!-- ユーザー入力エリア -->
    <section>
      <div>
        <label>質問：</label>
        <input type="text" v-model="userQuestion" placeholder="何を聞きたいですか？" :disabled="result" class="glow-input" />
      </div>

      <div class="number-inputs">
        <div>
          <label>数字1：</label>
          <input type="number" v-model.number="num1" :disabled="result" class="glow-input" />
        </div>
        <div>
          <label>数字2：</label>
          <input type="number" v-model.number="num2" :disabled="result" class="glow-input" />
        </div>
        <div>
          <label>数字3：</label>
          <input type="number" v-model.number="num3" :disabled="result" class="glow-input" />
        </div>
      </div>

      <div>
        <label>カテゴリを選択：</label>
        <div>
          <div v-for="(item, index) in categoryLabels" :key="index" style="display: inline-block; margin-right: 10px;">
            <input
              type="radio"
              :id="item.value + index"
              :value="item.value"
              v-model="selectedCategory"
              :disabled="result"
              class="category-label"
            />
            <label :for="item.value + index">{{ item.label }}</label>
          </div>
        </div>
      </div>

      <button @click="startProcess" :disabled="result" class="glow-button">入力を確認</button>
    </section>

    <!-- 卦象結果表示 -->
    <section v-if="result">
      <p><strong>あなたの質問：</strong>{{ userQuestion }}</p>
      <p><strong>選択したカテゴリ：</strong>{{ categoryLabels.find(item => item.value === selectedCategory)?.label }}</p>

      <div v-if="lineDetails && lineDetails[selectedCategory]">
        <h3>対応する卦象結果：</h3>
        <p>{{ lineDetails[selectedCategory] }}</p>
      </div>

      <div>
        <button @click="showMore = !showMore" class="toggle-button">
          <span>{{ showMore ? '卦象内容を非表示' : 'さらに内容を表示' }}</span>
          <span class="toggle-icon">{{ showMore ? '▼' : '▲' }}</span>
        </button>
      </div>

      <div v-if="showMore" class="extra-details">
        <div v-if="lineDetails?.image" class="image-container">
          <img :src="lineDetails.image" alt="卦象画像" class="line-detail-image" />
        </div>
        <div class="hexagram-info">
          <div class="hexagram-item">
            <span class="hexagram-label">下卦：</span>
            <span class="hexagram-value">{{ bagua[lowerRemainder - 1] }}</span>
            <span class="hexagram-remainder">（余り {{ lowerRemainder }}）</span>
          </div>
          <div class="hexagram-item">
            <span class="hexagram-label">上卦：</span>
            <span class="hexagram-value">{{ bagua[upperRemainder - 1] }}</span>
            <span class="hexagram-remainder">（余り {{ upperRemainder }}）</span>
          </div>
          <div class="hexagram-item">
            <span class="hexagram-label">動爻：</span>
            <span class="hexagram-value">第 {{ movingLineRemainder }} 爻</span>
          </div>
        </div>

        <div v-if="hexagram" class="hexagram-description">
          <div class="hexagram-item">
            <span class="hexagram-label">卦象名：</span>
            <span class="hexagram-value">{{ hexagram.name }}</span>
          </div>
          <div class="hexagram-item">
            <span class="hexagram-label">卦象の説明：</span>
            <p class="hexagram-text">{{ hexagram.description }}</p>
          </div>
        </div>
      </div>

      <button @click="continueInput" class="glow-button">再入力する</button>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import baguaData from '../assets/bagua.json';

const num1 = ref(null);
const num2 = ref(null);
const num3 = ref(null);
const userQuestion = ref('');
const selectedCategory = ref('');
const result = ref(false);
const showMore = ref(false);
const showVideoModal = ref(false); // ✅ 影片彈窗控制

const lowerRemainder = ref(0);
const upperRemainder = ref(0);
const movingLineRemainder = ref(0);
const fomula = ref(null);
const hexagram = ref({});
const lineDetails = ref(null);
const bagua = ["乾", "兌", "離", "震", "巽", "坎", "艮", "坤"];
const hexagrams = baguaData.hexagrams || [];

const categoryLabels = [
  { label: "外出", value: "travel" },           // 外出
  { label: "天気", value: "weather" },          // 天氣
  { label: "風水", value: "fengshui" },         // 風水
  { label: "失せ物", value: "lost_property" },   // 失物
  { label: "商売", value: "business" },         // 生意
  { label: "財運", value: "business1" },        // 財運
  { label: "妊娠", value: "pregnancy" },        // 胎孕
  { label: "貴人に会う", value: "meeting_noble" }, // 遇貴人
  { label: "取引", value: "transaction" },      // 交易
  { label: "昇進", value: "official_position" }, // 功名
  { label: "家宅", value: "house" },            // 家宅
  { label: "訴訟", value: "court_case" },       // 官司
  { label: "健康", value: "health" },           // 健康
  { label: "運命", value: "fate" },             // 命運
  { label: "結婚", value: "marriage" },         // 婚姻
  { label: "競争", value: "war" }               // 競爭
];


const getBaguaNumber = (num, modValue) => {
  const remainder = num % modValue;
  return remainder !== 0 ? remainder : modValue;
};

const startProcess = () => {
  if (!num1.value || !num2.value || !num3.value || !selectedCategory.value) {
    alert('請正確輸入三個數字並選擇分類。');
    return;
  }

  showVideoModal.value = true; // ✅ 顯示影片
};

const handleVideoEnd = () => {
  showVideoModal.value = false;
  processInput(); // ✅ 影片播放完才開始算卦
};

const processInput = async () => {
  lowerRemainder.value = getBaguaNumber(num1.value, 8);
  upperRemainder.value = getBaguaNumber(num2.value, 8);
  movingLineRemainder.value = getBaguaNumber(num3.value, 6);

  fomula.value = null;
  hexagram.value = {};

  for (const hex of hexagrams) {
    const formulaParts = hex.fomula.split(',');
    if (
      parseInt(formulaParts[0]) === upperRemainder.value &&
      parseInt(formulaParts[1]) === lowerRemainder.value
    ) {
      fomula.value = hex.fomula;
      hexagram.value = hex;
      break;
    }
  }

  try {
    if (!fomula.value) throw new Error('找不到對應卦象');
    const sanitized = fomula.value.replace(/[^\w\s]/gi, '');
    const fomulaData = await import(`../assets/${sanitized}.json`);

    for (const line of fomulaData.default) {
      if (line.line === movingLineRemainder.value) {
        lineDetails.value = line;
        if (line.business && !line.business1) {
          lineDetails.value.business1 = line.business;
        }
        break;
      }
    }
  } catch (error) {
    console.error('無法載入卦象檔案:', error);
  }

  result.value = true;
};

const continueInput = () => {
  num1.value = null;
  num2.value = null;
  num3.value = null;
  userQuestion.value = '';
  selectedCategory.value = '';
  result.value = false;
  showMore.value = false;
  fomula.value = null;
  hexagram.value = {};
  lineDetails.value = null;
};
</script>

<style scoped>
#app {
  font-family: 'KaiTi', 'SimHei', Arial, sans-serif;
  padding: 20px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7)),
              url('../assets/chinese-background.png') no-repeat center center fixed;
  background-size: cover;
  color: #f1f1f1;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

#app::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="rgba(195, 110, 0, 0.1)" stroke-width="1"/></svg>');
  opacity: 0.3;
  pointer-events: none;
}

@media (min-width: 768px) {
  #app {
    /* 設定一個較合理的寬度上限，避免在大螢幕上過寬 */
    max-width: 80%;
    /* 讓元素在水平方向上置中 */
    margin: 0 auto;
  }
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #c36e00;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 30px;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
}

section {
  margin-bottom: 30px;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3),
              0 0 20px rgba(195, 110, 0, 0.1);
  width: 100%;
  max-width: 500px;
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(195, 110, 0, 0.3);
}

section:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.number-inputs {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
}

.number-inputs > div {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.glow-input {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  box-sizing: border-box;
  border: 2px solid rgba(195, 110, 0, 0.3);
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
  transition: all 0.3s ease;
  transform: scale(1);
}

.glow-input:hover {
  transform: scale(1.02);
  border-color: rgba(195, 110, 0, 0.5);
}

.glow-input:focus {
  outline: none;
  border-color: #c36e00;
  box-shadow: 0 0 15px rgba(195, 110, 0, 0.3);
  transform: scale(1.02);
}

label {
  font-size: 1.1rem;
  color: #c36e00;
  margin-bottom: 5px;
}

.glow-button {
  position: relative;
  overflow: hidden;
  padding: 15px 30px;
  background: linear-gradient(135deg, rgba(195, 110, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%);
  border: 2px solid rgba(195, 110, 0, 0.3);
  border-radius: 12px;
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: scale(1);
}

.glow-button:hover {
  transform: scale(1.05);
  background: linear-gradient(135deg, #c36e00 0%, #000000 100%);
  box-shadow: 0 0 20px rgba(195, 110, 0, 0.4);
}

.extra-details {
  margin-top: 30px;
  background-color: rgba(255, 255, 255, 0.95);
  color: #333;
  padding: 30px;
  border-radius: 15px;
  border: 2px solid #c36e00;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.hexagram-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px 0;
  padding: 20px;
  background: rgba(195, 110, 0, 0.05);
  border-radius: 12px;
}

.hexagram-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.hexagram-item:hover {
  transform: translateX(5px);
}

.hexagram-label {
  font-weight: bold;
  color: #c36e00;
  min-width: 80px;
}

.hexagram-value {
  font-size: 1.1em;
  color: #333;
}

.hexagram-remainder {
  color: #666;
  font-size: 0.9em;
}

.hexagram-description {
  margin-top: 20px;
  padding: 20px;
  background: rgba(195, 110, 0, 0.05);
  border-radius: 12px;
}

.hexagram-text {
  margin-top: 10px;
  line-height: 1.6;
  color: #444;
}

.image-container {
  margin-bottom: 20px;
  text-align: center;
}

.line-detail-image {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.line-detail-image:hover {
  transform: scale(1.02);
}

.warning-box {
  background-color: rgba(254, 244, 244, 0.9);
  color: #8a0000;
  border: 2px solid #f8d0d0;
  padding: 20px;
  border-radius: 12px;
  font-size: 14px;
  font-style: italic;
  margin: 20px 0;
}

.instruction p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 15px 0;
}

.small-banner,
.line-detail-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  display: block;
  margin: 20px auto;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

input[type="radio"] {
  margin-right: 8px;
  transform: scale(1.2);
}

.category-label {
  display: none;
}

.category-label + label {
  display: inline-block;
  padding: 8px 16px;
  margin: 4px 6px;
  border: 2px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
  font-size: 14px;
  user-select: none;
}

.category-label:checked + label {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.category-label:disabled + label {
  background-color: #e0e0e0;
  color: #999;
  cursor: not-allowed;
  border-color: #ccc;
}

.category-label:not(:disabled):hover + label {
  background-color: #dbeeff;
  border-color: #80bdff;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.small-banner {
  animation: float 3s ease-in-out infinite;
}

.video-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.video-player {
  width: 100%;
  height: auto;
  max-width: 400px;
}

.video-container {
  position: relative;
}

.skip-button {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.skip-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.toggle-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, rgba(195, 110, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%);
  border: 2px solid rgba(195, 110, 0, 0.3);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 20px auto;
  width: fit-content;
}

.toggle-button:hover {
  background: linear-gradient(135deg, rgba(195, 110, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%);
  border-color: rgba(195, 110, 0, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(195, 110, 0, 0.2);
}

.toggle-icon {
  font-size: 0.8em;
  transition: transform 0.3s ease;
}

.toggle-button:hover .toggle-icon {
  transform: scale(1.2);
}
</style>
