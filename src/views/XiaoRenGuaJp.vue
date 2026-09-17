<template>
  <div class="liuren-wrapper">
    <h2>🧙 小六壬占い</h2>

    <div>
      <button @click="toggleContent">{{ isContentVisible ? '閉じる' : '小六壬占いの説明 | 展開' }}</button>
      <div v-if="isContentVisible">
        <p>
          小六壬（しょうろくじん）占いは、「小六壬命理占い」とも呼ばれ、古代中国の陰陽五行、天干地支、そして易経に基づいた占いです。地支を核とし、天干と五行の相生相克の原理を組み合わせて、個人の運命、運勢、将来の発展などを推測します。
        </p>
        <p>小六壬占いの基本概念：</p>

        <div class="concept-container">
          <div class="concept-item">
            <strong>天干地支：</strong>天干と地支は、古代中国で時間を記録するために使われたシステムです。天干は10、地支は12あり、合わせて「六十甲子」と呼ばれる60の組み合わせを作り、年、月、日、時間などを表します。小六壬占いは、これらの天干地支の相互関係から答えを導き出します。
          </div>
          <div class="concept-item">
            <strong>地支：</strong>それぞれの地支は、五行（木、火、土、金、水）と陰陽に関係しています。小六壬占いでは、質問された時間、特に生まれた年、月、日、時間から個人の「地支」を特定します。
          </div>
          <div class="concept-item">
            <strong>占いの流れ：</strong>小六壬占いのプロセスでは、質問の内容に応じて適切な時間、方位、方法が選ばれ、天干、地支、五行などを組み合わせて結果が推測されます。これらの推測は、運勢、仕事、結婚、健康、財運など多岐にわたります。
          </div>
          <div class="concept-item">
            <strong>六壬神数：</strong>小六壬占いにおける「六壬神数」とは、占いの結果を数字で示し、問題の背景、進展、結果を解釈するのに役立ちます。
          </div>
          <div class="concept-item">
            <strong>占いの応用範囲：</strong>
            <div>運命予測：個人の運命や人生の軌跡を推測し、運勢や性格特性を理解するために使われます。</div>
            <div>仕事運：個人の将来の仕事の発展やキャリアの変更を占います。</div>
            <div>結婚と恋愛：結婚や恋愛の状況とその方向性について占います。</div>
            <div>健康：個人の体調や健康運を推測します。</div>
            <div>物事の吉凶：ある物事が順調に進むか、困難に直面するかを問います。</div>
          </div>
        </div>

        <p>小六壬占いの六課解説：</p>

        <div class="flex-container">
          <div class="text">
            <strong>大安：</strong>大安は「大吉安寧」を意味し、平安と安定を象徴します。万事が順調で、動くよりも静かにしている方が良く、すべてのことが吉とされます。
          </div>
          <img src="https://i.imgur.com/bIqsuTV.jpeg" alt="大安" class="image">
        </div>

        <div class="flex-container">
          <div class="text">
            <strong>留連：</strong>留連は遅延とためらいを表します。物事が決まらず、遅れたり繰り返したりする可能性があります。控えめに様子を見るのが良いでしょう。
          </div>
          <img src="https://i.imgur.com/NGoCOXc.jpeg" alt="留連" class="image">
        </div>

        <div class="flex-container">
          <div class="text">
            <strong>速喜：</strong>速喜は喜び事が早く訪れることを表し、万事が順調に進みます。行動を起こす、財を求める、結婚などの事柄に吉とされます。
          </div>
          <img src="https://i.imgur.com/dRHw6Cy.jpeg" alt="速喜" class="image">
        </div>

        <div class="flex-container">
          <div class="text">
            <strong>赤口：</strong>赤口は口論や紛争、トラブルを表します。役所に訴えたり交渉したりするのは避け、衝突や外出を控えるべきです。
          </div>
          <img src="https://i.imgur.com/nGodzNh.jpeg" alt="赤口" class="image">
        </div>

        <div class="flex-container">
          <div class="text">
            <strong>小吉：</strong>小吉は、大吉ではないものの進展があり、小さなことは成功します。大きなことを望まず、小さなことから始めるのが良いでしょう。
          </div>
          <img src="https://i.imgur.com/OOQS3wL.jpeg" alt="小吉" class="image">
        </div>

        <div class="flex-container">
          <div class="text">
            <strong>空亡：</strong>空亡は失われ、虚しくなることを象徴します。物事がうまくいかず、失望や失敗の可能性があります。静かに現状を維持すべきです。
          </div>
          <img src="https://i.imgur.com/1s3nz58.jpeg" alt="空亡" class="image">
        </div>

      </div>
    </div>

    <div class="input-block">
      <label>
        <input type="checkbox" v-model="useCurrentTime" /> 現在時刻を使用
      </label>
    </div>

    <div v-if="!useCurrentTime" class="input-block">
      <label for="date">日付を選択：</label>
      <input type="date" v-model="selectedDate" />
    </div>

    <div v-if="!useCurrentTime" class="input-block">
      <label for="hour">時間を選択（0~23）：</label>
      <input id="hour" type="number" v-model.number="selectedHour" min="0" max="23" />
    </div>

    <button @click="calculate">六課を計算</button>

    <div v-if="result">
      <p>🕐 時の地支：{{ currentEarthlyBranch }}</p>
      <p>🔮 占い結果：<strong>{{ result }}</strong></p>
      <p class="explanation">{{ explanations[result] }}</p>

      <img :src="resultImage" alt="六壬結果画像" class="result-image" />
    </div>

    <div class="lunar">
      <h3>現在の旧暦：</h3>
      <p>{{ lunarDate }}</p>
      <p>🌍 現在の時間帯の地支：{{ currentEarthlyBranch }}</p>
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
const useCurrentTime = ref(true); // 現在時刻を使用するかどうかを制御
const isContentVisible = ref(false);

const toggleContent = () => {
  isContentVisible.value = !isContentVisible.value;
};

// 各六課に対応する解説
const explanations = {
  '大安': '大安は「大吉安寧」を意味し、平安と安定を象徴します。万事が順調で、動くよりも静かにしている方が良く、すべてのことが吉とされます。',
  '留連': '留連は遅延とためらいを表します。物事が決まらず、遅れたり繰り返したりする可能性があります。控えめに様子を見るのが良いでしょう。',
  '速喜': '速喜は喜び事が早く訪れることを表し、万事が順調に進みます。行動を起こす、財を求める、結婚などの事柄に吉とされます。',
  '赤口': '赤口は口論や紛争、トラブルを表します。役所に訴えたり交渉したりするのは避け、衝突や外出を控えるべきです。',
  '小吉': '小吉は、大吉ではないものの進展があり、小さなことは成功します。大きなことを望まず、小さなことから始めるのが良いでしょう。',
  '空亡': '空亡は失われ、虚しくなることを象徴します。物事がうまくいかず、失望や失敗の可能性があります。静かに現状を維持すべきです。',
};

// 六課に対応する画像
const resultImages = {
  '大安': 'https://i.imgur.com/bIqsuTV.jpeg',
  '留連': 'https://i.imgur.com/NGoCOXc.jpeg',
  '速喜': 'https://i.imgur.com/dRHw6Cy.jpeg',
  '赤口': 'https://i.imgur.com/nGodzNh.jpeg',
  '小吉': 'https://i.imgur.com/OOQS3wL.jpeg',
  '空亡': 'https://i.imgur.com/1s3nz58.jpeg',
};

// 小六壬の六課
const xiaoLiuren = ['大安', '留連', '速喜', '赤口', '小吉', '空亡'];

// 時間に対応する地支を計算
const getZhishiHour = (hour) => {
  const index = Math.floor((hour + 1) / 2) % 12;
  return earthlyBranches[index];
};

const liurenKe = (month, day, riZhi) => {
  // 月、日、地支の総合的なインデックスを計算
  const monthIndex = month - 1; // 月は1から、インデックスは0から
  const dayIndex = day - 1;     // 日は1から、インデックスは0から
  console.log('riZhi:', riZhi);
  const riIndex = earthlyBranches.indexOf(riZhi); // 地支のインデックス

  // 計算プロセスの変数値を表示
  console.log('monthIndex:', monthIndex);
  console.log('dayIndex:', dayIndex);
  console.log('riIndex:', riIndex);

  // 公式を使って計算し、6で割った余りを取得
  const combinedIndex = (monthIndex + dayIndex + riIndex + 1) % 6;

  // 最終的な総合インデックスを出力
  console.log('combinedIndex:', combinedIndex);

  return xiaoLiuren[combinedIndex];
};

// 計算ボタンがトリガーされる関数
const calculate = () => {
  const currentDate = new Date();

  // 現在時刻を使用する場合、自動的に現在の日付と時間を設定
  const dateToUse = useCurrentTime.value ? currentDate : new Date(selectedDate.value);

  // 現在の時間の地支を使って計算
  const currentHour = new Date().getHours();
  hourBranch.value = getZhishiHour(currentHour); // 現在の時間の地支を計算

  // 月、日、地支に対応する六壬課を計算
  const lunarDate = getLunar(dateToUse.getFullYear(), dateToUse.getMonth() + 1, dateToUse.getDate());
  result.value = liurenKe(lunarDate.lunarMonth, lunarDate.lunarDate, earthlyBranches[Math.floor(currentHour / 2) % 12]);
};

// 日付と時間のフォールバックメカニズム、日付や時間が選択されていなくてもエラーにならないように
const getValidDate = () => {
  const currentDate = new Date();
  if (useCurrentTime.value) {
    return currentDate;
  }
  return selectedDate.value ? new Date(selectedDate.value) : currentDate;
};

// 現在の旧暦を計算
const lunarDate = computed(() => {
  const currentDate = getValidDate();
  const lunar = getLunar(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
  return lunar ? `${lunar.lunarYear}年 ${lunar.lunarMonth}月 ${lunar.lunarDate}日` : '旧暦の取得に失敗しました';
});

// 現在の時間帯の地支を表示
const currentEarthlyBranch = computed(() => {
  const currentHour = new Date().getHours();
  return getZhishiHour(currentHour);
});

// 六壬の結果に基づいて画像を表示
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
  margin-right: 20px; /* テキストと画像の間隔を追加 */
}

.image {
  max-width: 150px; /* 画像のサイズを制限 */
  height: auto;
  object-fit: contain;
}
</style>