<template>
  <div id="app">
    <h1>圖片上傳並存儲到Google Sheets</h1>

    <!-- 圖片上傳區 -->
    <input type="file" @change="handleFileUpload" />

    <!-- 顯示圖片預覽 -->
    <div v-if="imagePreview">
      <h3>預覽圖片:</h3>
      <img :src="imagePreview" alt="Image preview" width="200" />
    </div>

    <!-- 上傳圖片按鈕 -->
    <button v-if="imageBase64" @click="uploadToGoogleSheet">上傳圖片</button>

    <!-- 顯示載入狀態 -->
    <div v-if="loading">正在上傳...</div>

    <!-- 提交成功訊息 -->
    <div v-if="uploadSuccess">圖片上傳成功！</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      imageFile: null,          // 存儲圖片文件
      imageBase64: "",          // 存儲Base64編碼的圖片
      imagePreview: "",         // 顯示圖片預覽
      loading: false,           // 顯示上傳狀態
      uploadSuccess: false      // 顯示上傳成功訊息
    };
  },
  methods: {
    // 處理圖片上傳
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageFile = file;

        // 顯示圖片預覽
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imagePreview = reader.result;
          this.imageBase64 = reader.result.split(',')[1];  // 提取Base64數據部分
        };
        reader.readAsDataURL(file);
      }
    },

    // 上傳圖片到Google Sheets
    uploadToGoogleSheet() {
      this.loading = true;

      // 要發送到Google Sheets的API
      const baseUrl = "https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_URL/exec"; // 替換為你的Google Script URL
      const params = new URLSearchParams({
        action: "addImage",
        imageBase64: this.imageBase64,  // 發送Base64編碼的圖片
      });

      axios
        .get(`${baseUrl}?${params.toString()}`)
        .then(response => {
          this.loading = false;
          this.uploadSuccess = true;
          this.imagePreview = ""; // 清除預覽
          this.imageBase64 = "";  // 清除Base64數據
        })
        .catch(error => {
          console.error("上傳圖片時發生錯誤：", error);
          this.loading = false;
          alert("上傳失敗，請重試！");
        });
    }
  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>
