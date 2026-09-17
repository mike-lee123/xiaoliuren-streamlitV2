<template>
  <div id="shopping-section">
    <header>
      <h1>植物專區</h1>
    </header>

    <section class="product-list">
      <!-- 動態商品卡片 -->
      <div v-if="loading">載入中...</div>

      <div
        v-else
        v-for="product in displayedProducts"
        :key="product.id"
        class="product-card"
      >
        <router-link :to="`/product/${product.id}`">
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
        { id: "f1", name: "日本八角櫻桃", description: "日本八角櫻桃", image: "https://i.imgur.com/9YKLP5w.jpeg" },
        { id: "f2", name: "四方竹", description: "四方竹", image: "https://i.imgur.com/IaJfOYc.jpeg" },
        { id: "f3", name: "日本雪柳", description: "日本雪柳", image: "https://i.imgur.com/Zc0snXM.jpeg" },
        { id: "f4", name: "李氏櫻桃", description: "李氏櫻桃", image: "https://i.imgur.com/XvP3Vn8.jpeg" },
        { id: "f5", name: "觀音竹", description: "觀音竹", image: "https://i.imgur.com/DDSF6ud.jpeg" },
        { id: "f6", name: "壽娘子", description: "壽娘子", image: "https://i.ibb.co/TxcBLzhy/285004-0.jpg" },
        { id: "f7", name: "麝香楓", description: "麝香楓", image: "https://i.ibb.co/gMGs8ZKP/282682-0.jpg" },
        { id: "f8", name: "觀賞鳳梨", description: "觀賞鳳梨", image: "https://i.ibb.co/Csv2B4Nn/216133.jpg" },
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
    // 檢查點 1：防止重複抓取
    if (this.products.length > 0) {
      console.log("資料已存在，不重複抓取");
      return;
    }

    this.loading = true;
    const apiUrl = "https://script.google.com/macros/s/AKfycbwSFqQsynE1Hz2k5ibqjYjnqM4VO_5FZXUYq_Y2_OIbvl4xRFaK4QOYxEyPE_QVGyFsUg/exec?action=shopping";

    console.log("開始發送 API 請求...");

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("API 回應成功:", response.data);
        const allRecords = response.data.records;

        if (Array.isArray(allRecords)) {
          this.products = allRecords.map((item) => ({
            id: item.id,
            name: item.name || "未命名商品",
            description: item.description || "無描述",
            // 修正點：你的 JSON 裡面是 image1
            image: item.image1 || "" 
          }));
          console.log("處理後的 products 陣列長度:", this.products.length);
        } else {
          console.error("API 回傳格式不對，records 不是陣le");
        }
      })
      .catch((error) => {
        console.error("API 請求失敗，詳細錯誤：", error);
      })
      .finally(() => {
        this.loading = false;
      });
  },
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      window.scrollTo(0, 0); // 切換頁面後回到頂部
    }
  },
  nextPage() {
    this.currentPage++;
    window.scrollTo(0, 0);
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
