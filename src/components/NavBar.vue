<template>
  <nav class="nav">
    <ul class="nav__list">
      <li class="nav__list-item">
        <router-link class="nav__list-link" to="/">Crypto</router-link>
      </li>
      <li class="nav__list-item">
        <router-link class="nav__list-link" to="/about">About</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  &__list {

    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__list-item {
  }

  &__list-item + &__list-item {
    margin-left: 20px;
  }

  &__list-link {
    font-size: 16px;
    text-transform: uppercase;
    color: #000000;

    &:hover {
      text-shadow:  darkgoldenrod 0 0 2px;

    }

  }
}
</style>
