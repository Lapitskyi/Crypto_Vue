<template>
  <div class="graph">
    <h2 class="graph__title">{{ sel.name }} - USD</h2>
    <div class="graph__inner">
      <div
        v-for="(bar, idx) in normalizeGraph()"
        :key="idx"
        :style="{ height: `${bar}%` }"
        class="graph__item"
      >
        {{ bar.price }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Graph",
  props: {
    normalizeGraph: () => Number,
    // bar: {
    //   price: Number,
    //   required: true,
    // },
    sel: {
      name: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.graph {
  &__inner {
    margin-top: 20px;
    display: flex;
    align-items: flex-end;
    height: 200px;
    border-left: 1px solid #000000;
    border-bottom: 1px solid #000000;
  }

  &__title {
    font-size: 16px;
    text-transform: uppercase;
  }

  &__item {
    width: 10px;
    border: 1px solid purple;
    background-color: purple;
  }

  &__item + &__item {
    margin-left: 5px;
  }
}
</style>
