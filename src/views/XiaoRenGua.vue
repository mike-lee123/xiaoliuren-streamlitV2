<template>
  <div class="liuren-wrapper">
    <h2>🧙 小六壬占卜</h2>

    <div>
    
    <button @click="toggleContent">{{ isContentVisible ? '收起' : '小六壬占卜教學| 展開' }}</button>
    <div v-if="isContentVisible">
    <p>
      小六壬占卜，也稱為「小六壬命理占卜」，是一種基於中國古代陰陽五行、天干地支、以及易經的占卜方式。它的基礎是以「地支」為核心，結合天干和五行的相生相克原理，來推算出一個人的命運、運勢、未來的發展等。
    </p>
    <p>小六壬占卜的基本概念：</p>
    
    <div class="concept-container">
      <div class="concept-item">
        <strong>天干地支：</strong>天干和地支是中國古代用來記錄時間的系統。天干有十個，地支有十二個，兩者結合形成了六十個組合，稱為「六十甲子」，用來表示年、月、日、時等。小六壬占卜則是從這些天干地支的相互關係中推算出答案。
      </div>
      <div class="concept-item">
        <strong>地支：</strong>每一個地支都與五行（木、火、土、金、水）以及陰陽有關。小六壬占卜中，會根據所提問的時間，尤其是出生的年份、月份、日期和時辰，來確定一個人的「地支」。
      </div>
      <div class="concept-item">
        <strong>占卜流程：</strong>小六壬占卜的過程會根據所問的問題，選擇合適的時間、方位和方法，通過天干、地支、五行等的配合推算出結果。這些推算可以涉及到運勢、事業、婚姻、健康、財運等多方面。
      </div>
      <div class="concept-item">
        <strong>六壬神數：</strong>在小六壬占卜中，「六壬神數」是指六壬占卜的結果數字，它用來幫助解釋問題的背景、發展及後果。
      </div>
      <div class="concept-item">
        <strong>占卜的應用範圍：</strong>
        <div>命運預測：推算個人的命運和人生軌跡，通常用來了解一個人的運勢、性格特徵。</div>
        <div>事業運勢：占卜某人未來的事業發展、工作變動等。</div>
        <div>婚姻與感情：關於婚姻、戀愛的狀況和走向。</div>
        <div>健康：推測一個人的身體狀況及健康運勢。</div>
        <div>事物吉凶：問某件事是否順利或將遇到困難。</div>
      </div>
    </div>

    <p>小六壬占卜的卦象解釋：</p>

    <div class="flex-container">
      <div class="text">
        <strong>大安：</strong>大安即「大吉安寧」之意，象徵平安穩定，萬事順利，宜靜不宜動，諸事皆吉。
      </div>
      <img src="https://i.imgur.com/bIqsuTV.jpeg" alt="大安" class="image">
    </div>

    <div class="flex-container">
      <div class="text">
        <strong>留連：</strong>留連代表拖延與猶豫，諸事不決，可能會有耽擱或反覆，宜保守觀望。
      </div>
      <img src="https://i.imgur.com/NGoCOXc.jpeg" alt="留連" class="image">
    </div>

    <div class="flex-container">
      <div class="text">
        <strong>速喜：</strong>速喜代表喜事快速來臨，萬事皆順，利於行動、求財、婚嫁等事。
      </div>
      <img src="https://i.imgur.com/dRHw6Cy.jpeg" alt="速喜" class="image">
    </div>

    <div class="flex-container">
      <div class="text">
        <strong>赤口：</strong>赤口代表口舌是非、爭執糾紛，不宜見官或交涉，應避免衝突與出行。
      </div>
      <img src="https://i.imgur.com/nGodzNh.jpeg" alt="赤口" class="image">
    </div>

    <div class="flex-container">
      <div class="text">
        <strong>小吉：</strong>小吉雖非大好，但仍有進展，小事可成，宜行小事，不可貪大求多。
      </div>
      <img src="https://i.imgur.com/OOQS3wL.jpeg" alt="小吉" class="image">
    </div>

    <div class="flex-container">
      <div class="text">
        <strong>空亡：</strong>空亡象徵落空與虛無，諸事不利，會有失落或失敗的狀況，宜靜守不動。
      </div>
      <img src="https://i.imgur.com/1s3nz58.jpeg" alt="空亡" class="image">
    </div>

  </div>
</div>
    <!-- 切換使用當前時間或手動輸入時間 -->
    <div class="input-block">
      <label>
        <input type="checkbox" v-model="useCurrentTime" /> 使用當前時間
      </label>
    </div>

    <!-- 日期輸入 -->
    <div v-if="!useCurrentTime" class="input-block">
      <label for="date">選擇日期：</label>
      <input type="date" v-model="selectedDate" />
    </div>

    <!-- 時間輸入 -->
    <div v-if="!useCurrentTime" class="input-block">
      <label for="hour">選擇時間（0~23）：</label>
      <input id="hour" type="number" v-model.number="selectedHour" min="0" max="23" />
    </div>

    <!-- 計算按鈕 -->
    <button @click="calculate">計算六課</button>

    <!-- 顯示計算結果 -->
    <div v-if="result">
      <p>🕐 時支：{{ currentEarthlyBranch }}</p>
      <p>🔮 占卜結果：<strong>{{ result }}</strong></p>
      <p class="explanation">{{ explanations[result] }}</p>

      <!-- 根據六壬結果顯示圖片 -->
      <img :src="resultImage" alt="六壬結果圖片" class="result-image" />
    </div>

    <!-- 顯示當前農曆 -->
    <div class="lunar">
      <h3>當前農曆時間：</h3>
      <p>{{ lunarDate }}</p>
      <p>🌍 當前時辰：{{ currentEarthlyBranch }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getLunar } from 'chinese-lunar-calendar';

const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const selectedDate = ref('');
const selectedHour = ref(null);
const hourBranch = ref('');
const result = ref('');
const useCurrentTime = ref(true);  // 控制是否使用當前時間
const isContentVisible = ref(false);

const toggleContent = () => {
  isContentVisible.value = !isContentVisible.value;
};
// 各課對應解釋
const explanations = {
  '大安': '大安即「大吉安寧」之意，象徵平安穩定，萬事順利，宜靜不宜動，諸事皆吉。',
  '留連': '留連代表拖延與猶豫，諸事不決，可能會有耽擱或反覆，宜保守觀望。',
  '速喜': '速喜代表喜事快速來臨，萬事皆順，利於行動、求財、婚嫁等事。',
  '赤口': '赤口代表口舌是非、爭執糾紛，不宜見官或交涉，應避免衝突與出行。',
  '小吉': '小吉雖非大好，但仍有進展，小事可成，宜行小事，不可貪大求多。',
  '空亡': '空亡象徵落空與虛無，諸事不利，會有失落或失敗的狀況，宜靜守不動。',
};

// 六課對應的圖片
const resultImages = {
  '大安': 'https://i.imgur.com/bIqsuTV.jpeg',
  '留連': 'https://i.imgur.com/NGoCOXc.jpeg',
  '速喜': 'https://i.imgur.com/dRHw6Cy.jpeg',
  '赤口': 'https://i.imgur.com/nGodzNh.jpeg',
  '小吉': 'https://i.imgur.com/OOQS3wL.jpeg',
  '空亡': 'https://i.imgur.com/1s3nz58.jpeg',
};

// xiaoLiuren對應的六課
const xiaoLiuren = ['大安', '留連', '速喜', '赤口', '小吉', '空亡'];

// 計算對應時辰的地支
const getZhishiHour = (hour) => {
  const index = Math.floor((hour + 1) / 2) % 12;
  return earthlyBranches[index];
};

const liurenKe = (month, day, riZhi) => {
  // 計算月、日、地支的綜合索引
  const monthIndex = month - 1;  // 月份從1開始，索引從0開始
  const dayIndex = day - 1;      // 日份從1開始，索引從0開始
  console.log('riZhi:', riZhi);
  const riIndex = earthlyBranches.indexOf(riZhi); // 日支地支索引

  // 顯示計算過程的變量值
  console.log('monthIndex:', monthIndex);
  console.log('dayIndex:', dayIndex);
  console.log('riIndex:', riIndex);

  // 使用公式進行計算，將所有結果綜合後，將6餘數去除
  const combinedIndex = (monthIndex + dayIndex + riIndex+1) % 6;

  // 輸出最終的綜合索引
  console.log('combinedIndex:', combinedIndex);

  return xiaoLiuren[combinedIndex];
};
// 計算按鈕觸發的函數
const calculate = () => {
  const currentDate = new Date();

  // 如果選擇使用當前時間，則自動設定為現在的年月日和小時
  const dateToUse = useCurrentTime.value ? currentDate : new Date(selectedDate.value);
  
  // 使用當前時辰的地支來進行計算
  const currentHour = new Date().getHours();
  hourBranch.value = getZhishiHour(currentHour);  // 這裡計算當前時辰的地支

  // 計算月、日、日支對應的六壬課
  const lunarDate = getLunar(dateToUse.getFullYear(), dateToUse.getMonth() + 1, dateToUse.getDate());
  result.value = liurenKe(lunarDate.lunarMonth, lunarDate.lunarDate, earthlyBranches[(currentHour % 12)]);
};

// 日期與時間的回退機制，確保即使沒有選擇日期或時間也不會錯誤
const getValidDate = () => {
  const currentDate = new Date();
  if (useCurrentTime.value) {
    return currentDate;
  }
  return selectedDate.value ? new Date(selectedDate.value) : currentDate;
};

// 計算當前農曆
const lunarDate = computed(() => {
  const currentDate = getValidDate();
  const lunar = getLunar(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
  return lunar ? `${lunar.lunarYear}年 ${lunar.lunarMonth}月 ${lunar.lunarDate}日` : 'Unable to retrieve lunar date';
});

// 顯示當前時辰對應的地支
const currentEarthlyBranch = computed(() => {
  const currentHour = new Date().getHours();
  return getZhishiHour(currentHour);
});

// 根據六壬結果顯示圖片
const resultImage = computed(() => result.value ? resultImages[result.value] : '');
</script>

<style scoped>
.liuren-wrapper {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  margin: auto;
  font-family: "Microsoft JhengHei", sans-serif;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-block {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
}

button {
  background-color: #c36e00;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #8a4f0d;
}

p {
  margin: 10px 0;
  font-size: 16px;
}

.explanation {
  background: #fffbe6;
  border-left: 4px solid #ffc107;
  padding: 10px;
  font-size: 15px;
  border-radius: 4px;
}

.lunar {
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
}

.result-image {
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.concept-container {
  margin-left: 20px;
}

.concept-item {
  margin-bottom: 20px;
}

.flex-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.text {
  flex: 1;
  margin-right: 20px; /* Add space between text and image */
}

.image {
  max-width: 150px; /* Limit image size */
  height: auto;
  object-fit: contain;
}
</style>
