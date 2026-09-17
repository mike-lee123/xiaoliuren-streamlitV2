<template>
  <div>
    <h2>購物車</h2>
    <div v-if="cart.length > 0">
      <div v-for="(item, index) in cart" :key="index">
        <p>{{ item.name }} - {{ item.price }}元</p>
        <button @click="removeFromCart(index)">移除</button>
      </div>
      <p>總價: {{ totalPrice }}元</p>
    </div>
    <div v-else>
      <p>您的購物車是空的。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      cart: []
    }
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((total, item) => total + item.price, 0)
    }
  },
  methods: {
    removeFromCart(index) {
      this.cart.splice(index, 1)
    }
  },
  created() {
    // 假設購物車的資料會從 Vuex 或本地存儲獲取
    // 目前使用預設空購物車
  }
}
</script>

<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.cart-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.cart-item {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-item p {
  margin: 0;
  font-size: 1.1em;
}

button {
  background-color: #ff4444;
  color: white;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #cc0000;
}

.total-price {
  text-align: right;
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 20px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

.empty-cart {
  text-align: center;
  padding: 40px;
  background: #f8f9fa;
  border-radius: 8px;
  color: #666;
}

@media (max-width: 768px) {
  .cart-container {
    padding: 10px;
  }
  
  .cart-items {
    grid-template-columns: 1fr;
  }
  
  .cart-item {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
}
</style>
