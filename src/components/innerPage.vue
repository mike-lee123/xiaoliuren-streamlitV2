<template>
  <div class="content-container">
    <div class="image-section">
      <img :src="plantData.image" alt="Content Image" v-if="plantData.image" />
    </div>

    <div class="text-section">
      <h2 v-if="plantData.name">{{ plantData.name }}</h2>
      <h2 v-if="plantData.description" v-html="plantData.description"></h2>
      <p v-if="plantData.content" v-html="plantData.content"></p>

      <div class="content-text" v-if="!plantData.name && !plantData.description && !plantData.content">
        <p>
          This is a <strong>highlighted text</strong> section where you can 
          <em>emphasize</em> certain words. You can also add <u>underlined text</u> 
          or <span class="custom-style">custom styled elements</span>.
        </p>

        <p>
          Continue with other text here, maybe an additional <a href="#">link</a> 
          or some <code>code</code> if needed.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContentComponent",
  props: {
    plantData: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log('Plant Data:', this.plantData);
  }
};
</script>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.image-section img {
  width: 500px;
  height: 500px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
}

.text-section {
  width: 100%;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.text-section h2 {
  font-size: 2em;
  color: #333;
  margin-bottom: 10px;
}

.text-section p {
  font-size: 1.1em;
  color: #555;
  line-height: 1.6;
  margin-bottom: 15px;
}

.content-text p {
  font-size: 1.1em;
  color: #444;
  margin-bottom: 20px;
}

.content-text a {
  color: #007bff;
  text-decoration: none;
}

.content-text a:hover {
  text-decoration: underline;
}

.content-text code {
  background-color: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
}

.custom-style {
  color: #e74c3c;
  font-weight: bold;
}
</style>