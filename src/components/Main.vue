<template>
  <div id="plant-therapy">
    <header>
      <h1>文章分享</h1>
    </header>

    <section class="plant-list">
      <div class="plant-card">
        <router-link to="/mapGame">
          <img src="https://i.imgur.com/MsTEsbA.jpeg" alt="修仙小遊戲" />
          <h2>修仙小遊戲(開發中)</h2>
          <p>選出你的人生</p>
        </router-link>
      </div>
      <div v-for="(plant, index) in plants" :key="index" class="plant-card">
        <router-link :to="`/page/${plant.id}`">
          <img :src="plant.image" :alt="plant.name" />
          <h2>{{ plant.name }}</h2>
          <p>{{ plant.description }}</p>
        </router-link>

        <!-- 如果有 Instagram URL，嵌入 Instagram 帖子 -->
        <div v-if="plant.igUrl" class="instagram-embed">
          <div v-html="getInstagramEmbedCode(plant.igUrl)"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import plantsData from '../assets/main.json';

export default {
  name: 'PlantTherapy',
  data() {
    return {
      plants: plantsData
    };
  },
  methods: {
    // 根據 Instagram URL 生成嵌入代碼
    getInstagramEmbedCode(url) {
      const embedCode = `
        <blockquote class="instagram-media" 
          data-instgrm-permalink="${url}" 
          data-instgrm-version="13">
        </blockquote>
      `;
      this.loadInstagramScript(); // 動態加載 Instagram 的腳本
      return embedCode;
    },

    // 動態載入 Instagram 的嵌入腳本
    loadInstagramScript() {
      const existingScript = document.getElementById('instagram-embed-script');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'instagram-embed-script';
        script.async = true;
        script.src = 'https://www.instagram.com/embed.js';
        document.body.appendChild(script);
      }
    },

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

.plant-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
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
  height: 200px;
  object-fit: cover;
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

.plant-card a {
  text-decoration: none;
  color: inherit;
}

.plant-card a:hover {
  text-decoration: none;
}

/* Add styles for the Instagram embed */
.instagram-embed {
  margin-top: 2vh;
}
</style>
