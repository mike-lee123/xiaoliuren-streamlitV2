<template>
  <div class="video-container">
    <video autoplay muted loop playsinline>
      <source src="/mp4/funshui.mp4" type="video/mp4" />
      您的瀏覽器不支援 HTML5 視訊標籤。
    </video>
  </div>
</template>

<style scoped>


video {
  width: 100%;
  height: 90%;
  object-fit: cover; /* 讓影片填滿容器並裁剪多餘部分 */
  object-position: center top; /* 讓影片上邊對齊 */
  clip-path: inset(0 20% 0 0); /* 不影響裁切 */
  transform: translateX(10%); /* 向右移動 10% */
  border-radius: 8px; /* 可選：讓邊角更柔和 */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3); /* 可選：加點陰影 */
}
</style>
