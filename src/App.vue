<template>
  <Main />
</template>
<script>
import Main from "@/layouts/Main";
export default {
  name: "App",
  components: { Main },
};
</script>
<style lang="scss">
@import "./assets/scss/null.scss";
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
section + section {
  margin: 20px 0;
  padding: 20px 0;
}
</style>
