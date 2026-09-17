<template>
  <div class="character-image-container">
    <img :src="characterImage" alt="Main Character" class="character-image" />
  </div>
</template>

<script>
export default {
  name: 'CharacterImage',
  props: {
    characterImage: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.character-image-container {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  margin-bottom: 20px;
}

.character-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 8px;
}
</style> 