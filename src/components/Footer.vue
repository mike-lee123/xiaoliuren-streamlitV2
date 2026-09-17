<template>
  <footer class="product-links bg-gray-100 p-4 mt-10 text-center text-sm text-gray-600">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
 
      <div class="flex gap-4">
        <a href="/about" class="hover:underline">聯絡方式:ken998996@gmail.com</a>
      </div>
    </div>
  </footer>
</template>


<script>
export default {
  name: 'Footer'
};
</script>

<style scoped>
footer.product-links {
  margin-top: 40px;
  padding: 15px 20px;
  background-color: #f5f5f5;
  text-align: center;
}

footer.product-links a {
  color: #007bff;
  text-decoration: none;
  margin: 0 15px;
  font-size: 16px;
}

footer.product-links a:hover {
  text-decoration: underline;
}
</style>
