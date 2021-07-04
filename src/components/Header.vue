<template>
  <div class="header">
    <div class="container">
      <div class="header__inner">
        <Logo />
        <NavBar />
      </div>
    </div>

  </div>
</template>

<script>
import NavBar from "./NavBar";
import Logo from "./Logo";

export default {
  name: "Header",
  components: { NavBar, Logo },
};
</script>

<style lang="scss" scoped>
.header {
  &__inner {
    display: flex;
    align-items: center;
    padding: 10px 0;
  }
}
</style>
