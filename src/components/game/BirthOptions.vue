<template>
  <div class="birth-options-container">
    <div v-if="currentStep === 'birth_system'">
      <h3>出生選項</h3>
      <div class="options-list">
        <div 
          v-for="(option, index) in birthOptions" 
          :key="index"
          class="birth-option"
          :class="{ 'selected': selectedOption === index }"
          @click="selectOption(index)"
        >
          <h4>{{ option.title }}</h4>
          <p>{{ option.description }}</p>
        </div>
      </div>
    </div>

    <!-- 資質系統 -->
    <div v-if="currentStep === 'random_attributes'" class="talent-system">
      <h3>資質系統</h3>
      <div class="talent-attributes">
        <div class="talent-attribute" v-for="(value, key) in talentAttributes" :key="key">
          <span class="attribute-name">{{ getAttributeName(key) }}:</span>
          <span class="attribute-value">{{ value }}</span>
          <div v-if="showFreePoints" class="attribute-controls">
            <button 
              class="attribute-button" 
              @click="decreaseAttribute(key)"
              :disabled="value <= 1 || freePoints <= 0"
            >-</button>
            <button 
              class="attribute-button" 
              @click="increaseAttribute(key)"
              :disabled="value >= 10 || freePoints <= 0"
            >+</button>
          </div>
        </div>
      </div>
      <div v-if="showFreePoints" class="free-points">
        剩餘自由點數: {{ freePoints }}
      </div>
      <div class="button-group">
        <button class="randomize-button" @click="randomizeAttributes">重新隨機資質</button>
        <button 
          class="confirm-button" 
          @click="confirmAttributes"
          :disabled="!canConfirm"
          v-if="showConfirmButton"
        >確認資質</button>
      </div>
    </div>

    <!-- 出身地點 -->
    <div v-if="currentStep === 'birth_location'" class="location-system">
      <h3>出身地點</h3>
      <div class="location-options">
        <div 
          v-for="(option, index) in locationOptions" 
          :key="index"
          class="location-option"
          :class="{ 'selected': selectedLocation === index }"
          @click="selectLocation(index)"
        >
          <h4>{{ option }}</h4>
        </div>
      </div>
    </div>

    <!-- 初始屬性 -->
    <div v-if="currentStep === 'initial_stats'" class="stats-system">
      <h3>初始屬性</h3>
      <div class="stats-list">
        <div class="stat-item" v-for="(value, key) in initialStats" :key="key">
          <span class="stat-name">{{ getStatName(key) }}:</span>
          <span class="stat-value">{{ value }}</span>
        </div>
      </div>
      <button class="confirm-button" @click="confirmStats">確認屬性</button>
    </div>
  </div>
</template>

<script>
import { getStartingItems } from '../../utils/inventoryUtils'


export default {
  name: 'BirthOptions',
  props: {
    birthOptions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentStep: 'birth_system',
      selectedOption: null,
      showTalentSystem: false,
      showFreePoints: false,
      showConfirmButton: false,
      talentAttributes: {
        spiritualRoot: 0,
        talent: 0,
        luck: 0,
        wealth: 0
      },
      freePoints: 5,
      canConfirm: false,
      selectedLocation: null,
      locationOptions: ['宗門', '散修'],
      initialStats: {
        lifespan: 100,
        spiritualPower: 10,
        age: 18
      }
    }
  },
  methods: {
    selectOption(index) {
      this.selectedOption = index;
      const selectedOption = this.birthOptions[index];
      this.$emit('option-selected', selectedOption);
      
      // 根據選擇的家世添加初始道具
      const startingItems = getStartingItems(selectedOption.title);
      if (startingItems.length > 0) {
        this.$emit('starting-items-selected', startingItems);
      }
      
      // 進入下一個步驟
      this.currentStep = 'random_attributes';
      this.randomizeAttributes();
    },
    randomizeAttributes() {
      const selectedBirthOption = this.birthOptions[this.selectedOption];
      const baseAttributes = selectedBirthOption.effects.initialAttributes;
      
      this.talentAttributes = {
        spiritualRoot: this.getRandomValue(baseAttributes.spiritualRoot),
        talent: this.getRandomValue(baseAttributes.talent),
        luck: this.getRandomValue(baseAttributes.luck),
        wealth: this.getRandomValue(baseAttributes.wealth)
      };
      
      this.showFreePoints = true;
      this.showConfirmButton = true;
      this.freePoints = 5;
      this.canConfirm = false;
      this.$emit('attributes-randomized', this.talentAttributes);
    },
    getRandomValue(baseValue) {
      const variation = Math.floor(Math.random() * 3) - 1;
      return Math.max(1, Math.min(10, baseValue + variation));
    },
    getAttributeName(key) {
      const attributeNames = {
        spiritualRoot: '靈根',
        talent: '資質',
        luck: '氣運',
        wealth: '財富'
      };
      return attributeNames[key] || key;
    },
    getStatName(key) {
      const statNames = {
        lifespan: '壽命',
        spiritualPower: '靈力',
        age: '年齡'
      };
      return statNames[key] || key;
    },
    increaseAttribute(key) {
      if (this.freePoints > 0 && this.talentAttributes[key] < 10) {
        this.talentAttributes[key]++;
        this.freePoints--;
        this.checkCanConfirm();
      }
    },
    decreaseAttribute(key) {
      if (this.talentAttributes[key] > 1) {
        this.talentAttributes[key]--;
        this.freePoints++;
        this.checkCanConfirm();
      }
    },
    checkCanConfirm() {
      this.canConfirm = this.freePoints === 0;
    },
    confirmAttributes() {
      if (this.canConfirm) {
        this.showFreePoints = false;
        this.$emit('attributes-confirmed', this.talentAttributes);
        // 進入下一個步驟
        this.currentStep = 'birth_location';
      }
    },
    selectLocation(index) {
      this.selectedLocation = index;
      this.$emit('location-selected', this.locationOptions[index]);
      // 進入下一個步驟
      this.currentStep = 'initial_stats';
    },
    confirmStats() {
      this.$emit('stats-confirmed', this.initialStats);
      // 完成所有步驟
      this.$emit('all-steps-completed');
    }
  }
}
</script>

<style scoped>
.birth-options-container {
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.birth-options-container h3 {
  text-align: center;
  margin-bottom: 15px;
  color: #fff;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.birth-option {
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.birth-option:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.birth-option.selected {
  background-color: rgba(0, 150, 255, 0.3);
  border: 1px solid rgba(0, 150, 255, 0.5);
}

.birth-option h4 {
  margin: 0 0 5px 0;
  color: #fff;
}

.birth-option p {
  margin: 0;
  font-size: 14px;
  color: #ccc;
}

.talent-system, .location-system, .stats-system {
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.talent-attributes, .location-options, .stats-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 15px 0;
}

.talent-attribute, .location-option, .stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.attribute-name, .stat-name {
  color: #fff;
}

.attribute-value, .stat-value {
  color: #ffd700;
  font-weight: bold;
  margin: 0 10px;
}

.attribute-controls {
  display: flex;
  gap: 5px;
}

.attribute-button {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: rgba(0, 150, 255, 0.3);
  border: 1px solid rgba(0, 150, 255, 0.5);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.attribute-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.free-points {
  text-align: center;
  margin: 10px 0;
  color: #ffd700;
  font-weight: bold;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.randomize-button, .confirm-button {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.randomize-button {
  background-color: rgba(0, 150, 255, 0.3);
  border: 1px solid rgba(0, 150, 255, 0.5);
  color: #fff;
}

.confirm-button {
  background-color: rgba(0, 200, 0, 0.3);
  border: 1px solid rgba(0, 200, 0, 0.5);
  color: #fff;
}

.confirm-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 