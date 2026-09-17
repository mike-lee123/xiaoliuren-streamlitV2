<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  components: { Header, Footer },
  computed: {
    showHeader() {
      return !this.$route.meta.noHeader;
    },
    showFooter() {
      return !this.$route.meta.noFooter;
    }
  }
};
</script>

<template>
  <div id="app" class="app-container">
    <Header v-if="showHeader" />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <Footer v-if="showFooter" />
  </div>
</template>
