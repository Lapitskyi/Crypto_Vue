<template>
  <div class="logo">
    <router-link to="/">
      <img
        class="logo__img"
        src="../assets/images/icon_crypto.png"
        alt="logo"
      />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Logo",
};
</script>

<style lang="scss" scoped>
.logo {
  width: 100px;
  overflow: hidden;

  &__img {
    max-width: 100%;
  }
}
</style>
