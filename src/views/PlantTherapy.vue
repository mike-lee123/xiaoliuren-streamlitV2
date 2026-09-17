<template>
  <div id="plant-therapy">
    <header>
      <h1>植物專區</h1>
      <!-- Add a button to navigate to the category section -->
      <div class="categories">
        <button @click="goToCategory">前往植物療育區</button>
      </div>
    </header>

    <!-- Add Instagram Embed -->
    <section class="plant-list">
      <div v-for="(plant, index) in plants" :key="index">
        <!-- Use InstagramEmbed component for each plant's igUrl -->
        <InstagramEmbed :igUrl="plant.igUrl" />
      </div>
    </section>
  
  </div>
</template>

<script>
import plantsData from '../assets/share.json';
import InstagramEmbed from './InstagramEmbed.vue'; // Import the new component

export default {
  name: 'PlantTherapy',
  components: {
    InstagramEmbed // Register the component
  },
  data() {
    return {
      plants: plantsData
    };
  },
  methods: {
    goToCategory() {
      window.location.href = '/#植物療育';
    }
  }
};
</script>

<style scoped>
#plant-therapy {
  font-family: 'Arial', sans-serif;
  text-align: center;
  padding: 2vw;
  background-color: #f8f9fa;
}

h1 {
  font-size: 4vw;
  color: #2c3e50;
  margin-bottom: 3vh;
}

.categories button {
  padding: 1.5vw 3vw;
  border: none;
  background: #28a745;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 2vh;
}

.categories button:hover {
  background: #218838;
}

.plant-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));  /* 使用 auto-fit 來更好的填充空間 */
  gap: 20px;  /* 增加間距 */
  margin-top: 4vh;
}
</style>
