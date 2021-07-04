<template>
  <li
    class="crypto__list-item"
    @click="$emit('selectedCrypto', crypto)"
  >
    <div class="crypto__list-box">
      <svg class="crypto__list-icon">
        <use href="" />
      </svg>
      <h2 class="crypto__list-title">{{ crypto.name }} - USD</h2>
      <div class="crypto__list-price">{{ crypto.price }}</div>
    </div>
    <button
      @click.stop="$emit('remove', crypto.id)"
      class="crypto__list-btn"
      type="button"
    >
      Delete
    </button>
  </li>
</template>

<script>
export default {
  name: "CryptoItem",
  props: {
    crypto: {
      id: Number,
      img: String,
      price: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.crypto {
  &__list-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    border: 4px solid #a0aec0;
    border-radius: 8px;
  }
  &__list-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  }
  &__list-title {
    font-size: 14px;
    color: #a0aec0;
    text-align: center;
    text-transform: uppercase;
  }
  &__list-price {
    font-size: 30px;
    color: #000000;
  }
  &__list-btn {
    display: inline-block;
    text-decoration: none;
    text-align: center;
    margin: 0;
    border: none;
    outline: none;
    text-transform: uppercase;
    white-space: nowrap;
    width: 100%;
    background-color: #a0aec0;
    font-size: 16px;
    color: #ffffff;
    padding: 20px;
    position: relative;
    &:focus {
      outline: none;
    }
  }
  &__list-icon {
    position: absolute;
    width: 20px;
    height: 20px;
  }

}
.active {
  border-color: green !important;
}
</style>
