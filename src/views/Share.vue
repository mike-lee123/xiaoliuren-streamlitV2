<template>
  <div id="shopping-section">
    <header>
      <h1>生活分享</h1>
    </header>

    <section class="product-list">
      <!-- 動態商品卡片 -->
      <div v-if="loading">載入中...</div>

     <div
  v-else
  v-for="(product, index) in displayedProducts"
  :key="product.id"
  class="product-card"
>
  <!-- 第一個商品的連結寫死 -->
  <router-link
    v-if="index === 0"
    to="/mapleSellingSystem"
  >
     <img
            src="https://live.staticflickr.com/65535/54559075111_de15918173_m.jpg"
            alt="楓之谷商品拍賣"
            class="product-image"
          />
    <h2>{{ product.name }}</h2>
    <p>{{ product.description }}</p>
  </router-link>

  <!-- 其他商品用原本連結 -->
  <router-link
    v-else
    :to="`/product/${product.id}`"
  >
    <img
      :src="product.image || defaultImage"
      :alt="product.name"
      class="product-image"
    />
    <h2>{{ product.name }}</h2>
    <p>{{ product.description }}</p>
  </router-link>
</div>
    </section>

    <!-- 分頁按鈕 -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">上一頁</button>
      <span>第 {{ currentPage }} 頁</span>
      <button @click="nextPage">下一頁</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShoppingSection",
  data() {
    return {
      currentPage: 1,
      loading: false,
      products: [],          // Google API抓的資料（第2頁起）
      defaultImage: "https://via.placeholder.com/300x180?text=No+Image",
      // 假資料（第一頁用）
      fakeProducts: [
          {
    "id": "mapleSellingSystem",
    "name": "楓之谷銷售工具",
    "image": "https://live.staticflickr.com/65535/54559075111_de15918173_m.jpg",
    "description": "創造力是每個人都能培養的技能，無論是在工作、學習還是生活中都能大有幫助。"
  },
  {
    "id": "a1",
    "name": "如何提高創造力",
    "image": "https://i.imgur.com/CQt4Hl3.jpeg",
    "description": "創造力是每個人都能培養的技能，無論是在工作、學習還是生活中都能大有幫助。"
  },
  {
    "id": "a2",
    "name": "提高免疫力的有效方法",
    "image": "https://i.imgur.com/YMmq6gw.jpeg",
    "description": "免疫系統是我們抵抗疾病的自然防線，保持強大的免疫力對於預防疾病和促進健康至關重要。"
  },
  {
    "id": "a3",
    "name": "睡眠的奇妙旅程",
    "image": "https://i.imgur.com/UNDw2k0.jpeg",
    "description": "有時候，我們會覺得睡眠只是為了休息，但對於某些人來說，睡眠是一次奇妙的冒險。"
  },
  {
    "id": "a4",
    "name": "睡眠的力量：你不知道的常識",
    "image": "https://i.imgur.com/I6djuTs.jpeg",
    "description": "你可能知道睡眠對健康的重要性，但你知道它對身體、情緒和大腦的影響遠比你想像的更大嗎？"
  }
],
    };
  },
  computed: {
    displayedProducts() {
      if (this.currentPage === 1) {
        return this.fakeProducts;
      } else {
        return this.products;
      }
    }
  },
  watch: {
    currentPage(newPage) {
      if (newPage === 1) {
        // 第一頁不用抓資料
        this.loading = false;
      } else {
        // 其他頁才去抓 API
        this.fetchProducts();
      }
    }
  },
  mounted() {
    // 預設載入第一頁假資料，不抓API
    this.loading = false;
  },
  methods: {
    fetchProducts() {
      this.loading = true;
      const apiUrl =
        "https://script.google.com/macros/s/AKfycbwSFqQsynE1Hz2k5ibqjYjnqM4VO_5FZXUYq_Y2_OIbvl4xRFaK4QOYxEyPE_QVGyFsUg/exec?action=share";

      axios
        .get(apiUrl)
        .then((response) => {
          const allRecords = response.data.records;

          this.products = Array.isArray(allRecords)
            ? allRecords.map((item) => ({
                id: item.id,
                name: item.name || "未命名商品",
                description: item.description || "無描述",
                image: item.image || ""
              }))
            : [];
        })
        .catch((error) => {
          console.error("發生錯誤：", error);
          alert("取得商品資料失敗，請稍後再試！");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      this.currentPage++;
    }
  }
};
</script>

<style scoped>
/* 你的原本CSS保持不變 */
#shopping-section {
  font-family: 'Arial', sans-serif;
  text-align: center;
  padding: 0 3vw; /* 取消上方 padding */
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

h1 {
  font-size: clamp(24px, 5vw, 40px);
  color: #2c3e50;
  margin-bottom: 3vh;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin: 4vh auto;
  width: 100%;
  max-width: 1400px;
  padding: 0 10px;
  flex: 1;
}

.product-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.product-image {
  width: 100%;
  height: auto;      /* 高度自動 */
  max-height: 240px; /* 最大高度 */
  object-fit: contain;
  background-color: #f0f0f0;
  display: block;
  border-bottom: 1px solid #eee;
}

.product-card h2 {
  margin: 1px 1px 3px;
  font-size: clamp(18px, 2.5vw, 28px);
  color: #2c3e50;
}

.product-card p {
  margin: 0 2px 3px;
  font-size: clamp(14px, 1.5vw, 18px);
  color: #555;
  flex-grow: 1;
}

.product-card a {
  text-decoration: none;
  color: inherit;
  display: block;
}

@media (max-width: 768px) {
  .product-list {
    display: flex !important;
    flex-direction: column !important;
    align-items: center;
    gap: 20px;
  }

  .product-card {
    width: 100% !important;
    max-width: 400px;
    padding: 0;
    border-radius: 10px;
  }

  .product-image {
    height: 150px;
  }

  .product-card h2 {
    margin: 12px 12px 6px;
    font-size: clamp(16px, 5vw, 22px);
  }

  .product-card p {
    margin: 0 12px 12px;
    font-size: clamp(12px, 4vw, 16px);
  }

  .product-card:hover {
    transform: none;
    box-shadow: 0 6px 15px rgba(0,0,0,0.1);
  }
}

/* 分頁按鈕樣式 */
.pagination {
  margin: 20px auto 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.pagination button {
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.pagination button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background-color: #1a2735;
}

.pagination span {
  font-size: 18px;
  color: #2c3e50;
}
</style>
