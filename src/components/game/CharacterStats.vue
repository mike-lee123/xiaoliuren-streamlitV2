<template>
  <div class="character-stats">
    <h3>角色屬性</h3>
    <div class="stats-section">
      <div class="stat-item" v-for="(value, key) in stats" :key="key">
        <span class="stat-name">{{ getStatName(key) }}:</span>
        <span class="stat-value">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterStats',
  props: {
    stats: {
      type: Object,
      required: true
    }
  },
  methods: {
    getStatName(key) {
      const statNames = {
        spiritualRoot: '靈根',
        talent: '資質',
        luck: '氣運',
        wealth: '財富',
        lifespan: '壽命',
        spiritualPower: '靈力',
        age: '年齡',
        level: '關卡'
      };
      return statNames[key] || key;
    }
  }
}
</script>

<style scoped>
.character-stats {
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-bottom: 20px;
}

.character-stats h3 {
  text-align: center;
  margin-bottom: 15px;
  color: #fff;
}

.stats-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.stat-name {
  color: #fff;
}

.stat-value {
  color: #ffd700;
  font-weight: bold;
}
</style> 