<template>
  <div class="page-container">
    <div class="content-wrapper">
      <!-- Pass the plant data to the ContentComponent -->
      <ContentComponent :plantData="plantData" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ContentComponent from "../components/innerPage.vue";

export default {
  components: {
    ContentComponent
  },
  data() {
    return {
      plantId: this.$route.params.id,  // This會根據路由或情境來設置
      plantData: null // 存儲從 API Gateway 獲取的數據
    };
  },
  created() {
    // 當元件創建時獲取數據
    this.loadLocalBackupData();
  },
  methods: {
    async loadLocalBackupData() {
      try {
        const response = await fetch(`https://www.getsmartcart.com/data/${this.plantId}.json`);
        console.log('response--------:', response);
        if (!response.ok) throw new Error('Network response was not ok');
        const localData = await response.json();
        console.log('data:', localData);
        this.plantData = localData;
      } catch (localError) {
        console.error('Error loading local backup data:', localError);
        this.plantData = {
          name: '暫無資料',
          image: 'https://example.com/fake-image.jpg',
          content: '<p>這是預設資料，實際內容正在載入中。</p>'
        };
      }
    }

  }
};
</script>

<style scoped>
.page-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.content-wrapper {
  width: 100%;
  max-width: 1200px;
}

/* 平板電腦 */
@media screen and (max-width: 1024px) {
  .content-wrapper {
    max-width: 900px;
  }
}

/* 手機 */
@media screen and (max-width: 768px) {
  .page-container {
    padding: 10px;
  }
  
  .content-wrapper {
    max-width: 100%;
  }
}

/* 小手機 */
@media screen and (max-width: 480px) {
  .page-container {
    padding: 5px;
  }
}
</style>
