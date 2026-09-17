<template>
  <div id="shopping-section">
    <header>
      <h1>購物專區</h1>
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
            :src="product.image1 || defaultimage1"
            :alt="product.name"
            class="product-image1"
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
import { useProductListStore } from "../stores/productStore";

export default {
  name: "ShoppingSection",
  data() {
    return {
      currentPage: 1,
      loading: false,
      defaultimage1: "https://via.placeholder.com/300x180?text=No+image1",
    };
  },
  computed: {
    displayedProducts() {
      const store = useProductListStore();

      if (store.products.length > 0) {
        console.log("store 已有資料，直接回傳 store.products，數量：", store.products.length);
        return store.products;
      } else {
        if (this.currentPage === 1) {
          console.log("store 無資料且是第一頁，呼叫 setFakeProducts");
          store.setFakeProducts();
          console.log("假資料已設定，store.products 數量：", store.products.length);
          return store.products;
        } else {
          console.log("store 無資料且不是第一頁，回傳空陣列");
          return [];
        }
      }
    }
  },
  watch: {
  currentPage(newPage) {
    const store = useProductListStore();
    console.log("currentPage 改變為:", newPage);

    if (newPage === 1) {
      if (store.products.length === 0) {
        console.log("第一頁且 store 無資料，設定假資料");
        store.setFakeProducts();
      } else {
        
        console.log("第一頁且 store 已有資料，不用重新設定");
      }
      this.loading = false;
    } else {
      if (store.products.length === 0) {
        console.log("非第一頁且 store 無資料，呼叫 fetchProducts");
        this.fetchProducts();
      } else {
        console.log("非第一頁且 store 已有資料，不用重新抓 API");
        displayedProducts();
        this.loading = false;
      }
    }
  }
},
  mounted() {
    const store = useProductListStore();
    store.setFakeProducts();
    this.loading = false;
  },
  methods: {
    fetchProducts() {
      const store = useProductListStore();
      this.loading = true;
      const apiUrl =
        "https://script.google.com/macros/s/AKfycbwSFqQsynE1Hz2k5ibqjYjnqM4VO_5FZXUYq_Y2_OIbvl4xRFaK4QOYxEyPE_QVGyFsUg/exec?action=shopping";

      axios
        .get(apiUrl)
        .then((response) => {
          const allRecords = response.data.records;

          const products = Array.isArray(allRecords)
            ? allRecords.map((item) => ({
                id: item.id,
                name: item.name || "未命名商品",
                description: item.description || "無描述",
                fullDescription: item.fullDescription || "",
                image1: item.image1 || "",
                image2: item.image2 || "",
                image3: item.image3 || "",
                image4: item.image4 || "",
                image5: item.image5 || "",
              }))
            : [];
          store.setProducts(products);
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

.product-image1 {
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

  .product-image1 {
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
