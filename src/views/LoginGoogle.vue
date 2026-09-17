<template>
  <div>
    <button @click="getFileData">取得 JSON 檔案資料</button>
    <div v-if="jsonContent">
      <h2>檔案內容:</h2>
      <pre>{{ jsonContent }}</pre> <!-- 顯示 JSON 內容 -->
    </div>
    <div v-else>
      <p>載入檔案資訊中...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jsonContent: null,  // 用來儲存 JSON 檔案內容
      fileId: '1tcc2-kovIMvIEImZOkhET6evRS0mosN_', // 檔案 ID，從 Google Drive URL 中取得
      apiKey: 'AIzaSyC1NnqoS9TO6ghXppUhn7STZvC2rg0zhbY', // 你的 API 金鑰
      clientId: 'YOUR_CLIENT_ID', // 用你的 OAuth 客戶端 ID 替換
      scopes: 'https://www.googleapis.com/auth/drive.readonly', // 需要的權限
    };
  },
  mounted() {
    this.initGoogleAPI(); // 初始化 Google API
  },
  methods: {
    // 初始化 Google API
    initGoogleAPI() {
      window.gapi.load('client:auth2', this.initClient);
    },

    // 初始化 Google API 客戶端
    initClient() {
      window.gapi.client.init({
        apiKey: this.apiKey,
        clientId: this.clientId,
        scope: this.scopes,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"], // 驅動程式的 API 發現文件
      }).then(() => {
        this.login();  // 初始化後呼叫登入方法
      }).catch(error => {
        console.error('Google API client initialization failed', error);
      });
    },

    // 登入 Google 帳戶
    login() {
      if (!window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        window.gapi.auth2.getAuthInstance().signIn(); // 若未登入，觸發登入流程
      }
    },

    // 取得 JSON 檔案資料
    getFileData() {
      if (window.gapi.client && window.gapi.client.drive) {
        window.gapi.client.drive.files.get({
          fileId: this.fileId,  // 檔案 ID
          alt: 'media', // 取得檔案內容
        }).then((response) => {
          const fileContent = response.body;  // 取得檔案內容
          try {
            // 嘗試解析 JSON 內容
            this.jsonContent = JSON.stringify(JSON.parse(fileContent), null, 2);
          } catch (e) {
            console.error('JSON 解析失敗:', e);
          }
        }).catch((error) => {
          console.error('讀取 JSON 檔案失敗:', error);
        });
      }
    }
  },
};
</script>

<style scoped>
button {
  padding: 10px 15px;
  margin: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

pre {
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 5px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
