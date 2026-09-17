<template>
  <div id="psychic-therapy">
    <header>
      <h1>算命專區</h1>
    </header>

    <section class="psychic-list">
      <!-- 靜態卡片 -->
      <div class="psychic-card">
        <router-link to="/bagua">
          <img src="https://i.imgur.com/IpEJ8Nc.jpeg" alt="八卦算命" />
          <h2>八卦算命</h2>
          <p>利用三個數字算出是否合適做決定</p>
        </router-link>
      </div>

<div class="psychic-card">
  <router-link to="/baguaJp">
    <img src="https://i.imgur.com/IpEJ8Nc.jpeg" alt="八卦占い 日本語版" />
    <h2>八卦占いJP</h2>
    <p>3つの数字を使って決断の是非を占う</p>
  </router-link>
</div>

      <div class="psychic-card">
        <router-link to="/destinyDigits">
          <img src="https://i.imgur.com/fMHEGDt.jpeg" alt="生命靈數" />
          <h2>生命靈數</h2>
          <p>利用生日選出你的個性</p>
        </router-link>
      </div>

<div class="psychic-card">
  <router-link to="/destinyDigitsJp">
    <img src="https://i.imgur.com/fMHEGDt.jpeg" alt="数秘術" />
    <h2>生命数秘術JP</h2>
    <p>生年月日からあなたの個性を見つけよう</p>
  </router-link>
</div>

      <div class="psychic-card">
        <router-link to="/xiaoRenGua">
          <img src="https://i.imgur.com/Gdqib9M.jpeg" alt="小六壬卦" />
          <h2>小六壬卦</h2>
          <p>掐指一算算出運勢</p>
        </router-link>
      </div>

<div class="psychic-card">
  <router-link to="/xiaoRenGuaJp">
    <img src="https://i.imgur.com/Gdqib9M.jpeg" alt="小六壬占い" />
    <h2>小六壬占いJP</h2>
    <p>指で簡単に運勢を占う</p>
  </router-link>
</div>

      <div class="psychic-card">
        <router-link to="/bazhi">
          <img src="https://i.imgur.com/MsTEsbA.jpeg" alt="八字" />
          <h2>八字</h2>
          <p>利用生日選出你的個性</p>
        </router-link>
      </div>

      <!-- 動態卡片 -->
      <div v-for="(psychic, index) in psychics" :key="index" class="psychic-card">
        <router-link :to="`/page/${psychic.id}`">
          <img :src="psychic.image" :alt="psychic.name" />
          <h2>{{ psychic.name }}</h2>
          <p>{{ psychic.description }}</p>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import psychicData from '../assets/psychic.json';

export default {
  name: 'psychicTherapy',
  data() {
    return {
      psychics: psychicData
    };
  },
  methods: {
    goToCategory() {
      window.location.href = '/#植物療育';
    }
  }
};
</script>

<style scoped>
#psychic-therapy {
  font-family: 'Arial', sans-serif;
  text-align: center;
  padding: 0 3vw; /* 取消上方 padding */
  background-color: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  margin: 0;
  padding: 0;
}
h1 {
  font-size: clamp(24px, 5vw, 40px);
  color: #2c3e50;
  margin-bottom: 3vh;
}

.psychic-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin: 4vh auto;
  width: 100%;
  max-width: 1400px;
  padding: 0 10px;
  flex: 1;
}

.psychic-card {
  background-color: white;
  padding: 1.5vw;
  border-radius: 1vw;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.psychic-card:hover {
  transform: translateY(-0.5vw);
}

.psychic-card img {
  width: 100%;
  height: auto;
  max-height: 180px;
  object-fit: contain;
  border-radius: 1vw;
  border: 2px solid white;
  box-sizing: border-box;
  display: block;
  margin: 0 auto;
}

.psychic-card h2 {
  margin-top: 1.5vh;
  font-size: clamp(18px, 2.5vw, 28px);
  color: #2c3e50;
}

.psychic-card p {
  font-size: clamp(14px, 1.5vw, 18px);
  color: #555;
  margin-top: 1vh;
}

.psychic-card a {
  text-decoration: none;
  color: inherit;
  display: block;
}

/* ✅ 手機版直排修正 */
@media (max-width: 768px) {
  .psychic-list {
    display: flex !important;
    flex-direction: column !important;
    align-items: center;
    gap: 20px;
  }

  .psychic-card {
    width: 100% !important;
    max-width: 400px;
    padding: 5vw;
  }

  .psychic-card img {
    max-height: 150px;
  }

  .psychic-card h2 {
    font-size: clamp(16px, 5vw, 22px);
  }

  .psychic-card p {
    font-size: clamp(12px, 4vw, 16px);
  }

  .psychic-card:hover {
    transform: none; /* 禁用手機 hover 效果 */
  }
}
</style>
