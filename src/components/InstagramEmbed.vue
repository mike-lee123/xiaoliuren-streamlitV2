<template>
  <section class="instagram-card">
    <div class="card-content">
      <!-- Name and Description Section -->
      <div class="plant-info">
        <h4 class="plant-name">{{ name }}</h4>
        <p class="plant-description">{{ description }}</p>
      </div>

      <!-- Instagram Embed Section -->
      <section class="instagram-embed" v-if="igUrl">
        <blockquote class="instagram-media"
          :data-instgrm-permalink="igUrl"
          data-instgrm-version="14"
          style="background:#FFF; border:0; padding:0; margin: 0 0 1em 0; max-width:100%; width:100%; min-width:50%; margin: 0 auto;">
        </blockquote>
      </section>

      <!-- Image Section (when igUrl is not provided) -->
      <section v-else class="image-embed">
        <img :src="image" alt="Plant Image" style="max-width: 100%; width: 100%; border-radius: 8px;" />
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: 'InstagramEmbed',
  props: {
    igUrl: {
      type: String,
      required: false
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false
    }
  },
  mounted() {
    // Dynamically load Instagram embed script after component is mounted
    if (this.igUrl) {
      const script = document.createElement('script');
      script.async = true;
      script.src = "//www.instagram.com/embed.js";
      document.body.appendChild(script);
    }
  }
};
</script>

<style scoped>
.instagram-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0.5vw 2vw rgba(0, 0, 0, 0.1);
  padding: 3%; /* Using percentage for padding */
  margin: 3% 0;
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.card-content {
  width: 100%;
  max-width: 95%; /* Make card content take up 90% of the screen width */
  margin: 0 auto;
}

.plant-info {
  text-align: center;
  margin-bottom: 3%; /* Using percentage for bottom margin */
}

.plant-name {
  font-size: 3.5vw; /* Reduced font size to make the title smaller */
  font-weight: bold;
  color: #2c3e50;
  margin-top: 0;  /* Remove top margin to avoid space at the top */
  margin-bottom: 0; /* Remove bottom margin to avoid space at the bottom */
  margin-left: 5%;  /* Added left margin for better alignment */
  margin-right: 5%; /* Added right margin for better alignment */
}

.plant-description {
  font-size: 2vw; /* Font size adjusted with percentage */
  color: #555;
}

.instagram-embed {
  width: 100%;
  max-width: 90%; /* Instagram embed will take up 90% of the width */
}

.instagram-embed blockquote {
  margin: 0;
  width: 100%;
}

.image-embed {
  width: 100%;
  max-width: 90%;
  margin-top: 10px;
}
</style>
