<template>
  <div class="heading">
    <div class="navbar-d">
      <p class="title">Snødybder i Trondheim og omegn</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>

.title {
  text-align: left;
  margin-left: 20px;
  font-weight: bold;
  color: rgba(54, 53, 53, 1);
}
.heading {
  margin: 0;
  padding: 0px;
  background-color: white;
  
}
.navbar-d {
  height: 30px;
  padding-top: 0;
  
}
.heading > h1 {
  padding: 0px;
  margin: 0px;
}
</style>