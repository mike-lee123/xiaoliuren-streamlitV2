<template>
  <div class="game-container">
    <div class="left-sidebar">
      <CharacterStats :stats="attributes" />
      <button class="reset-button" @click="resetGame">重置遊戲</button>
    </div>
    <div class="main-content">
      <CharacterImage :character-image="characterImage" />
      <div class="game-info">
        <h2>{{ characterName }}</h2>
        <p>{{ characterDescription }}</p>
      </div>
    </div>
    
    <InventoryAndBirth
      :inventory="inventory"
      :birth-options="birthOptions"
      @birth-option-selected="handleBirthOptionSelected"
      @starting-items-selected="handleStartingItemsSelected"
    />
  </div>
</template>

<script>
import CharacterImage from '../components/game/CharacterImage.vue'
import InventoryAndBirth from '../components/game/InventoryAndBirth.vue'
import CharacterStats from '../components/game/CharacterStats.vue'
import birthOptionsData from '../data/birthOptions.json'
import { getStartingItems } from '../utils/inventoryUtils'
import itemsData from '../assets/item.json'

export default {
  name: 'MapGame',
  components: {
    CharacterImage,
    InventoryAndBirth,
    CharacterStats
  },
  data() {
    // 從localStorage加載庫存，如果沒有則使用默認值
    const savedInventory = localStorage.getItem('gameInventory');
    const savedAttributes = localStorage.getItem('characterAttributes');
    const defaultInventory = [
      {
        code: 'LS001',
        name: '靈石',
        image: 'https://i.imgur.com/a79JRqm.jpeg',
        count: 0
      }
    ];
    
    const defaultAttributes = {
      spiritualRoot: 5,
      talent: 5,
      luck: 5,
      wealth: 5,
      lifespan: 100,
      spiritualPower: 10,
      age: 18
    };
    
    return {
      characterImage: 'https://i.imgur.com/eyswmOA.jpeg',
      characterName: '主角名稱',
      characterDescription: '主角描述',
      inventory: savedInventory ? JSON.parse(savedInventory) : defaultInventory,
      birthOptions: birthOptionsData.birthOptions,
      attributes: savedAttributes ? JSON.parse(savedAttributes) : defaultAttributes
    }
  },
  methods: {
    resetGame() {
      // 重置所有數據到默認值
      this.inventory = [
        {
          code: 'LS001',
          name: '靈石',
          image: 'https://i.imgur.com/a79JRqm.jpeg',
          count: 0
        }
      ];
      
      this.attributes = {
        spiritualRoot: 5,
        talent: 5,
        luck: 5,
        wealth: 5,
        lifespan: 100,
        spiritualPower: 10,
        age: 18
      };
      
      this.currentLevel = 1;
      
      // 清除localStorage中的所有遊戲數據
      localStorage.removeItem('gameInventory');
      localStorage.removeItem('characterAttributes');
      localStorage.removeItem('currentLevel');
    },
    handleBirthOptionSelected(option) {
      console.log('Selected birth option:', option);
      const startingItems = getStartingItems(option.title);
      if (startingItems.length > 0) {
        this.handleStartingItemsSelected(startingItems);
      }
      
      // 更新角色屬性
      if (option.effects && option.effects.initialAttributes) {
        this.attributes = {
          ...this.attributes,
          ...option.effects.initialAttributes
        };
        localStorage.setItem('characterAttributes', JSON.stringify(this.attributes));
      }
    },
    handleStartingItemsSelected(items) {
      // 將初始道具添加到道具欄，合併相同道具的數量
      const newInventory = [...this.inventory];
      items.forEach(newItem => {
        // 查找物品的code
        const itemData = itemsData.find(item => item.name === newItem.name);
        if (itemData) {
          const existingItem = newInventory.find(item => item.code === itemData.code);
          if (existingItem) {
            existingItem.count += newItem.count;
          } else {
            newInventory.push({
              code: itemData.code,
              name: newItem.name,
              image: newItem.image,
              count: newItem.count
            });
          }
        }
      });
      this.inventory = newInventory;
      // 保存到localStorage
      localStorage.setItem('gameInventory', JSON.stringify(this.inventory));
    }
  },
  watch: {
    // 監聽inventory變化，自動保存到localStorage
    inventory: {
      handler(newInventory) {
        localStorage.setItem('gameInventory', JSON.stringify(newInventory));
      },
      deep: true
    },
    // 監聽attributes變化，自動保存到localStorage
    attributes: {
      handler(newAttributes) {
        localStorage.setItem('characterAttributes', JSON.stringify(newAttributes));
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.game-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  background-color: #1a1a1a;
  color: #fff;
  padding: 20px;
  gap: 20px;
}

.left-sidebar {
  width: 250px;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.game-info {
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

.game-info h2 {
  margin: 0 0 10px 0;
  color: #fff;
}

.game-info p {
  margin: 0;
  color: #ccc;
  line-height: 1.5;
}

.reset-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.reset-button:hover {
  background-color: #cc0000;
}

/* RWD手動調整： */
@media (max-width: 1024px) {
  .game-container {
    flex-direction: column; /* 在較小螢幕下改為垂直排列 */
    height: auto;
  }

  .left-sidebar {
    width: 100%;
    margin-bottom: 20px;
  }

  .main-content {
    width: 100%;
  }

  .game-info {
    padding: 15px;
    border-radius: 8px;
  }

  .reset-button {
    width: 100%;
    padding: 12px;
    font-size: 18px;
  }
}

@media (max-width: 768px) {
  .game-container {
    padding: 15px;
  }

  .left-sidebar {
    width: 100%;
    margin-bottom: 20px;
  }

  .main-content {
    width: 100%;
  }

  .game-info {
    padding: 10px;
  }

  .reset-button {
    width: 100%;
    padding: 12px;
    font-size: 18px;
  }
}

</style>
