<template>
  <ul class="crypto__list">
    <crypto-item
      v-for="crypto in cryptoArray"
      :crypto="crypto"
      :sel="sel"
      :key="crypto.id"
      @remove="$emit('remove', crypto.id)"
      @selectedCrypto="$emit('selectedCrypto', crypto)"
      :class="{
        active: sel === crypto,
      }"
    >
    </crypto-item>
  </ul>
</template>

<script>
import CryptoItem from "./CryptoItem";

export default {
  name: "CryptoList",
  components: { CryptoItem },
  props: {
    cryptoArray: {
      type: Array,
      required: true,
    },
    sel: Object,
  },
};
</script>

<style lang="scss" scoped>
.crypto {
  &__list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-template-rows: minmax(170px, auto);
    grid-gap: 10px;
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
</style>
