<template>
  <div class="inventory-birth-container">
    <div class="inventory-section">
      <h3>道具</h3>
      <div class="inventory-items">
        <div v-for="(item, index) in aggregatedInventory" :key="index" class="inventory-item">
          <img :src="item.image" :alt="item.name" class="item-image" />
          <span class="item-code">{{ item.code }}</span>
          <span class="item-name">{{ item.name }}</span>
          <span class="item-count">x{{ item.count }}</span>
        </div>
      </div>
    </div>
    
    <div class="birth-section">
      <BirthOptions 
        :birth-options="birthOptions"
        @option-selected="handleBirthOptionSelected"
        @attributes-randomized="handleAttributesRandomized"
      />
    </div>
  </div>
</template>

<script>
import BirthOptions from './BirthOptions.vue'
import { refreshInventory } from '../../utils/inventoryUtils'

export default {
  name: 'InventoryAndBirth',
  components: {
    BirthOptions
  },
  props: {
    inventory: {
      type: Array,
      required: true
    },
    birthOptions: {
      type: Array,
      required: true
    }
  },
  computed: {
    aggregatedInventory() {
      // 聚合相同道具的數量
      const inventoryMap = new Map();
      this.inventory.forEach(item => {
        const key = item.name;
        if (inventoryMap.has(key)) {
          inventoryMap.get(key).count += item.count;
        } else {
          inventoryMap.set(key, { ...item });
        }
      });
      return Array.from(inventoryMap.values());
    }
  },
  methods: {
    handleBirthOptionSelected(option) {
      this.$emit('birth-option-selected', option);
      // 刷新道具欄位
      this.$emit('inventory-updated', refreshInventory(this.inventory));
    },
    handleStartingItemsSelected(items) {
      this.$emit('starting-items-selected', items);
    },
    handleAttributesRandomized(attributes) {
      this.$emit('attributes-randomized', attributes);
    }
  }
}
</script>

<style scoped>
.inventory-birth-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  height: 100%;
}

.inventory-section h3,
.birth-section h3 {
  text-align: center;
  margin-bottom: 15px;
  color: #fff;
}

.inventory-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 10px;
}

/* 自定義滾動條樣式 */
.inventory-items::-webkit-scrollbar {
  width: 8px;
}

.inventory-items::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.inventory-items::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.inventory-items::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}

.inventory-item {
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  gap: 10px;
}

.item-image {
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 4px;
}

.item-code {
  color: #4CAF50;
  font-weight: bold;
  min-width: 60px;
  text-align: center;
}

.item-name {
  flex: 1;
  color: #fff;
  margin-left: 10px;
}

.item-count {
  color: #ffd700;
  font-weight: bold;
  min-width: 40px;
  text-align: right;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .inventory-birth-container {
    padding: 10px;
    gap: 15px;
  }

  .inventory-items {
    max-height: 200px;
  }

  .inventory-item {
    padding: 6px;
    gap: 8px;
  }

  .item-image {
    width: 20px;
    height: 20px;
  }

  .item-name {
    font-size: 0.9em;
  }

  .item-count {
    font-size: 0.9em;
    min-width: 30px;
  }
}

@media (max-width: 480px) {
  .inventory-items {
    max-height: 150px;
  }

  .inventory-item {
    padding: 4px;
    gap: 6px;
  }

  .item-image {
    width: 16px;
    height: 16px;
  }

  .item-name {
    font-size: 0.8em;
  }

  .item-count {
    font-size: 0.8em;
    min-width: 25px;
  }
}
</style> 