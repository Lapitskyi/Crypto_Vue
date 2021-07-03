<template>
  <button class="btn" type="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
};
</script>

<style lang="scss" scoped>
.btn {
  display: inline-block;
  text-decoration: none;
  text-align: center;
  border: none;
  outline: none;
  text-transform: uppercase;
  white-space: nowrap;

  font-size: 16px;
  background-color: #718096;
  color: #fff;
  padding: 10px;
  border-radius: 8px;
  position: relative;

  &:focus {
    outline: none;
  }
}
</style>
