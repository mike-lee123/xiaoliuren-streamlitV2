<template>
  <div id="plant-therapy">
    <header>
      <h1>植物專區</h1>
    </header>

    <!-- Add Instagram Embed -->
    <section class="plant-list">
      <div v-for="(plant, index) in plants" :key="index">
        <!-- Use InstagramEmbed component and pass the Instagram URL -->
        <InstagramEmbed 
          :igUrl="plant.igUrl" 
          :name="plant.name" 
          :description="plant.description" 
        />
      </div>
    </section>
  </div>
</template>

<script>
// 引入 InstagramEmbed 組件
import InstagramEmbed from '../components/InstagramEmbed.vue';
import plantsData from '../assets/share.json';

export default {
  name: 'PlantTherapy',
  components: {
    InstagramEmbed  // 註冊 InstagramEmbed 組件
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
  },
  mounted() {
  // Dynamically load Instagram embed script after component is mounted
  const script = document.createElement('script');
  script.async = true;
  script.src = "//www.instagram.com/embed.js";
  script.onload = () => {
    this.$nextTick(() => {
      // Reinitialize Instagram embeds after DOM updates
      window.instgrm.Embeds.process();
    });
  };
  document.body.appendChild(script);
}
};
</script>

<style scoped>
#plant-therapy {
  font-family: 'Arial', sans-serif;
  text-align: center;
  padding: 3%;  /* Using percentage for padding */
  background-color: #f8f9fa;
}



.categories button {
  padding: 2% 4%;  /* Adjusted padding to percentage */
  border: none;
  background: #28a745;
  color: white;
  border-radius: 5%;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 3%;  /* Adjusted bottom margin */
}

.categories button:hover {
  background: #218838;
}

.plant-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25%, 1fr));  /* Set grid item min-width as percentage */
  gap: 3%;  /* Adjusted gap using percentage */
  margin-top: 3%;  /* Adjusted top margin using percentage */
}

.instagram-embed {
  margin-top: 2%;  /* Adjusted top margin */
  margin-bottom: 2%;  /* Adjusted bottom margin */
}

.instagram-media {
  border: 1px solid #ccc;  /* Lighter border */
  border-radius: 4%;  /* Rounded border using percentage */
  margin: 0 auto;
  width: 90%;  /* Adjusted width to 90% */
  max-width: 100%;  /* Allow it to grow with the parent container */
}

.categories button {
  font-size: 2%; /* Adjusted button font size */
}
</style>
