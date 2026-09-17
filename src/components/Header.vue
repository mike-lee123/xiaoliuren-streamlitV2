<template>
  <header>
    <!-- 將 h1 包裹在 router-link 中 -->
    <router-link to="/" class="logo-link">
      <h1>SmartCart</h1>
    </router-link>
    <nav class="categories">
      <router-link v-for="category in categories" :key="category" :to="categoryLink(category)">
        <button>{{ category }}</button>
      </router-link>
    </nav>
    <div class="login-icon">
      <button @click="goToLogin">
        <i class="fas fa-user"></i>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      // categories: ["分享故事","科技新知", "心理算命", "梗圖笑話", "植物療育", "購物","創意","生活分享",,"mydriver"]
      categories: [ "心理算命", "植物療育", "購物","生活分享"]
      // ,"mydriver"
    };
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    categoryLink(category) {
      switch (category) {
        case "植物療育":
          return "/plant";
        case "科技新知":
          return "/tech";
        case "分享故事":
          return "/story";
        case "心理算命":
          return "/psychic";
        case "梗圖笑話":
          return "/memes";
        case "購物":
          return "/shopping";
          case "創意":
          return "/creative";
          case "生活分享":
          return "/share";
          case "mydriver":
          return "/googleLogin";
        default:
          return "/";
      }
    }
  }
};
</script>

<style scoped>
/* Header styles */
header {
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
}

header .logo-link {
  text-decoration: none;
  color: white;
}

header h1 {
  font-size: 24px;
  margin-right: 20px;
}

nav.categories {
  display: flex;
  gap: 15px;
}

nav.categories a {
  text-decoration: none;
}

nav.categories button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

nav.categories button:hover {
  text-decoration: underline;
}

.login-icon button {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.login-icon button i {
  font-size: 24px;
}
</style>
