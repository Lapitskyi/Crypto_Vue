<template>
  <div class="main">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "../components/Header";
export default {
  name: "Main",
  components: { Header },
};
</script>

<style scoped></style>
