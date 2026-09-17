<template>
  <div id="plant-therapy">
    <header>
      <h1>植物專區</h1>
    </header>

    <section class="plant-list">
      <div v-for="(plant, index) in plants" :key="index" class="plant-card">
        <router-link :to="`/page/${plant.id}`">
          <img :src="plant.image" :alt="plant.name" />
          <h2>{{ plant.name }}</h2>
          <p>{{ plant.description }}</p>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import plantsData from '../assets/plants.json';

export default {
  name: 'PlantTherapy',
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

.plant-card {
  background: white;
  border-radius: 1vw;
  overflow: hidden;
  box-shadow: 0 0.5vw 2vw rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  padding: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #f8f9fa;
}

.plant-card:hover {
  transform: translateY(-1vw);
}

.plant-card img {
  width: 100%;
  height: 200px;  /* 固定高度 */
  object-fit: cover;  /* 保持圖片比例，並填滿容器 */
  border-radius: 1vw;
}

.plant-card h2 {
  margin-top: 1.5vh;
  font-size: 2.5vw;
  color: #2c3e50;
}

.plant-card p {
  font-size: 1.5vw;
  color: #555;
  margin-top: 1vh;
}

/* Remove link default styles */
.plant-card a {
  text-decoration: none;
  color: inherit;
}

.plant-card a:hover {
  text-decoration: none;
}
</style>
