<template>
  <div>
    <h2>八字計算器</h2>

    <div>
      <label>西元年：</label>
      <input v-model="year" type="text" @input="updateLunarFromInput" />
    </div>

    <div>
      <label>月：</label>
      <input v-model="month" type="text" @input="updateLunarFromInput" />
    </div>

    <div>
      <label>日：</label>
      <input v-model="day" type="text" @input="updateLunarFromInput" />
    </div>

    <div>
      <label>時辰（24小時制整點）：</label>
      <input v-model="hour" type="text" />
    </div>

    <div>
      <p>對應農曆：{{ year }}年 {{ lunarMonth }} {{ lunarDay }}日</p>
    </div>

    <button @click="calculateBazi">重新計算八字</button>

    <div v-if="result">
      <p>年柱: {{ result.chineseYear }}（十神：{{ result.chineseYearTenGod }}）</p>
      <p>月柱: {{ result.chineseMonth }}（十神：{{ result.chineseMonthTenGod }}）</p>
      <p>日柱: {{ result.chineseDay }}（十神：{{ result.chineseDayTenGod }}）</p>
      <p>時柱: {{ result.chineseTime }}（十神：{{ result.chineseTimeTenGod }}）</p>

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import lunar from '@tony801015/chinese-lunar';

const year = ref('1988');
const month = ref('06');
const day = ref('30');
const hour = ref('11');
const result = ref(null);

const lunarYear = ref('');
const lunarMonth = ref('');
const lunarDay = ref('');

const updateLunarFromInput = () => {
  if (year.value && month.value && day.value) {
    try {
      const data = lunar(year.value, month.value.padStart(2, '0'), day.value.padStart(2, '0'), false).getJson();
      lunarYear.value = data.lunarYear;
      lunarMonth.value = data.lunarMonth;
      lunarDay.value = data.lunarDay;
    } catch (err) {
      lunarYear.value = '';
      lunarMonth.value = '';
      lunarDay.value = '';
    }
  }
};

const calculateBazi = () => {
  try {

    const data1 = lunar(year.value, month.value, day.value)
      .setTime(hour.value)
      .getJson();
      console.log('八字結果:', data1.chineseYear);
      let isLeapMonth = false; // 根據農曆資料判斷是否為閏月
      if (data1.isLeapMonth === month.value) {
      isLeapMonth = true;
    }
    const data = lunar(year.value, month.value, day.value)
      .setTime(hour.value)
      // .lunarToSolar(isLeapMonth)
      .setChineseAge( data1.chineseYear) // 出生年
      .getJson();

    result.value = data;
    console.log('八字結果:', result.value);
  } catch (error) {
    console.error('八字計算錯誤:', error);
    result.value = null;
  }
};

// 初始化時顯示預設農曆
updateLunarFromInput();
</script>
