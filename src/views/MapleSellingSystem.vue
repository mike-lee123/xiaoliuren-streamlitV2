<template>
  <div id="app">
    <h1>商品銷售系統</h1>

    <!-- 查詢商品區塊 -->
    <div class="section">
      <button @click="toggleQuerySection">
        {{ showQuerySection ? "收合查詢商品" : "展開查詢商品" }}
      </button>

      <div v-if="showQuerySection" class="query-section">
        <h2>查詢商品資料</h2>
        <button @click="fetchProducts">查詢商品</button>

        <div v-if="loadingQuery" class="loading">載入中...</div>

        <table v-if="productList.length > 0">
          <thead>
            <tr>
              <th>名稱</th>
              <th>價格</th>
              <th>賣家</th>
              <th>買家/賣家</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in productList" :key="index">
              <td>{{ product.name }}</td>
              <td>{{ product.income_range }}</td>
              <td>{{ product.occupation }}</td>
              <td>{{ product.buyer_seller }}</td>
            </tr>
          </tbody>
        </table>

        <p v-if="!loadingQuery && productList.length === 0">尚無商品資料</p>
      </div>
    </div>

    <!-- 上架商品區塊 -->
    <div class="section">
      <button @click="toggleFormSection">
        {{ showFormSection ? "收合上架商品" : "展開上架商品" }}
      </button>

      <div v-if="showFormSection" class="form-section">
        <h2>上架新商品</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">名稱:</label>
            <input type="text" id="name" v-model="formData.name" required />
          </div>
          <div class="form-group">
            <label for="income_range">價格:</label>
            <input type="text" id="income_range" v-model="formData.income_range" required />
          </div>
          <div class="form-group">
            <label for="occupation">賣家:</label>
            <input type="text" id="occupation" v-model="formData.occupation" required />
          </div>
          <div class="form-group">
            <label for="buyer_seller">買家/賣家:</label>
            <input
              type="text"
              id="buyer_seller"
              v-model="formData.buyer_seller"
              required
            />
          </div>
          <button type="submit">提交資料</button>
        </form>

        <div v-if="loadingSubmit" class="loading">正在提交資料...</div>

        <div v-if="showSubmitResult">
          <p><strong>商品資料已成功提交！</strong></p>
          <p><strong>名稱:</strong> {{ formData.name }}</p>
          <p><strong>價格:</strong> {{ formData.income_range }}</p>
          <p><strong>賣家:</strong> {{ formData.occupation }}</p>
          <p><strong>買家/賣家:</strong> {{ formData.buyer_seller }}</p>
          <p><strong>結果:</strong> {{ result }}</p>
          <button @click="resetForm">重新填寫</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showQuerySection: false,
      showFormSection: false,
      productList: [],
      loadingQuery: false,
      formData: {
        name: "",
        income_range: "",
        occupation: "",
        buyer_seller: ""
      },
      result: "",
      showSubmitResult: false,
      loadingSubmit: false,
      gachaResults: [
        "商品已成功上架！",
        "商品已成功提交，祝銷售順利！",
        "資料已記錄，請稍後檢視庫存狀況。"
      ]
    };
  },
  methods: {
    toggleQuerySection() {
      this.showQuerySection = !this.showQuerySection;
    },
    toggleFormSection() {
      this.showFormSection = !this.showFormSection;
    },
    fetchProducts() {
      this.loadingQuery = true;
      const baseUrl =
        "https://script.google.com/macros/s/AKfycbyUjsJkcCRZj0xnwNd06TGa4rMdu6mM_93wZnlGIJswBvFmgffQD07G44k-cOcsUp30Hg/exec";
      const params = new URLSearchParams({
        action: "query"
      });

      axios
        .get(`${baseUrl}?${params.toString()}`)
        .then(response => {
          this.productList = response.data || [];
          this.loadingQuery = false;
        })
        .catch(error => {
          console.error("查詢資料失敗：", error);
          this.loadingQuery = false;
          alert("查詢資料失敗，請再試一次！");
        });
    },
    submitForm() {
      this.loadingSubmit = true;
      const baseUrl =
        "https://script.google.com/macros/s/AKfycbyUjsJkcCRZj0xnwNd06TGa4rMdu6mM_93wZnlGIJswBvFmgffQD07G44k-cOcsUp30Hg/exec";
      const selectedResult =
        this.gachaResults[Math.floor(Math.random() * this.gachaResults.length)];
      const params = new URLSearchParams({
        ...this.formData,
        action: "add",
        result: selectedResult
      });

      axios
        .get(`${baseUrl}?${params.toString()}`)
        .then(() => {
          this.result = selectedResult;
          this.showSubmitResult = true;
          this.loadingSubmit = false;
        })
        .catch(error => {
          console.error("提交資料時發生錯誤：", error);
          this.loadingSubmit = false;
          alert("提交資料失敗，請再試一次！");
        });
    },
    resetForm() {
      this.showSubmitResult = false;
      this.formData = {
        name: "",
        income_range: "",
        occupation: "",
        buyer_seller: ""
      };
    }
  }
};
</script>

<style scoped>
#app {
  text-align: center;
  margin: 30px auto;
  max-width: 600px;
  font-family: Arial, sans-serif;
}

.section {
  margin: 20px 0;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
}

button {
  margin: 10px;
  padding: 8px 15px;
  background-color: #4caf50;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #45a049;
}

.loading {
  color: #999;
  font-style: italic;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 8px;
}

table th {
  background-color: #f2f2f2;
}
</style>
