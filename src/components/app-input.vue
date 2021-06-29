<template>
  <form class="form">
    <label for="inputForm" class="form__label">
      Тикер
      <input
        v-model="ticker"
        @keydown.enter="addCrypto"
        type="text"
        name="inputForm"
        id="inputForm"
        class="form__input"
        placeholder="Например DOGE"
      />
    </label>

    <button class="form__btn">
      <svg className="form__btn-icon">
        <use href="{`${svgSprite}#plus`}" />
      </svg>
      Добавить
    </button>
  </form>
</template>

<script>
// import svgSprite from "../assets/svgSprite/svgSprite.svg";
export default {
  name: "InputCrypto",
  data() {
    return {
      ticker: "",
    };
  },
  props: ["addCrypto"],
};
</script>

<style lang="scss" scoped>
.form {
  &__label {
  }

  &__input {
  }

  &__btn {
  }
}
</style>
