export default {
  async authenticateGoogleAPI(apiKey, clientId, scopes) {
    try {
      await window.gapi.client.init({
        apiKey: apiKey,
        clientId: clientId,
        scope: scopes,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"]
      });

      // 嘗試獲取 auth 實例
      let authInstance = window.gapi.auth2.getAuthInstance();
      
      // 如果 authInstance 不存在，才初始化
      if (!authInstance) {
        authInstance = window.gapi.auth2.init({ client_id: clientId, scope: scopes });
      }

      // 如果用戶未登入，進行登入
      if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
      }
    } catch (error) {
      console.error('Google API client initialization failed', error);
      throw error; // 回傳錯誤，方便外部處理
    }
  },

  async getFileData(fileId) {
    try {
      const response = await window.gapi.client.drive.files.get({
        fileId: fileId,
        alt: 'media' // 取得檔案內容
      });

      return response.body;  // 返回檔案內容
    } catch (error) {
      console.error('Error fetching file data from Google Drive', error);
      throw error;  // 回傳錯誤
    }
  },

  // 檢查帳號密碼
  validateAccountPassword(jsonData, username, password) {
    const user = jsonData.find((user) => user.account === username);
    return user && user.password === password;
  }
};
